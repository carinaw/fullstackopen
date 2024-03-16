const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = `

type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
	me: User
}

type Book {
    title: String
    author: Author
    published: String
    genres: [String]
    id: ID!
}

type Author {
    name: String!
    bookCount: Int!
    born: Int
}


type User {
	username: String!
	favoriteGenre: String!
	id: ID!
}

type Token {
	value: String!
}

type Mutation {
    addBook(
        title: String!
        author: String!
        published: String!
        genres: [String]
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
        ): Author
	createUser(
		username: String!
		favoriteGenre: String!): User
	login(
		username: String!
		password: String!): Token
}
`;

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			try {
				if (!args.author && !args.genre) {
					const books = await Book.find({}).populate("author");
					console.log("Type of fetched data:", typeof books);
					console.log("Is array:", Array.isArray(books));

					return books;
				}

				if (args.author && !args.genre) {
					const books = await Book.find({}).populate({
						path: "author",
						match: { name: args.author },
					});
					return books.filter((book) => book.author !== null);
				}

				if (!args.author && args.genre) {
					const books = await Book.find({
						genres: { $in: [args.genre] },
					}).populate("author");
					return books;
				}

				if (args.author && args.genre) {
					const books = await Book.find({
						genres: { $in: [args.genre] },
					}).populate(
						populate({
							path: "author",
							match: { name: args.author },
						})
					);
					return books.filter((book) => book.author !== null);
				}
			} catch (error) {
				console.error("nope", error);
				throw new Error("failed to fetch");
			}
		},
		allAuthors: async () => {
			const authors = await Author.find({});

			const authorsWithBookCount = authors.map(async (author) => {
				const bookCount = await Book.countDocuments({
					author: author._id,
				});

				return {
					...author.toObject(),
					bookCount,
				};
			});
			return Promise.all(authorsWithBookCount);
		},
		me: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("not authenticated");
			}
			console.log(context.currentUser);
			return context.currentUser;
		},
	},
	Book: {
		author: async (root) => {
			return {
				name: root.author.name,
				born: root.author.born,
			};
		},
	},
	Author: {
		bookCount: async (author) => {
			const count = await Book.countDocuments({ author: author._id });
			return count;
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("not authenticated");
			}

			author = await Author.findOne({ name: args.author });

			if (args.author.length < 3) {
				throw new GraphQLError("author name too short", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.author,
					},
				});
			}
			if (!author) {
				author = new Author({ name: args.author });
				await author.save();
			}

			if (args.title.length < 3) {
				throw new GraphQLError("title too short", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
					},
				});
			}

			try {
				const book = new Book({
					title: args.title,
					published: args.published,
					author: author._id,
					genres: args.genres,
				});
				// Could also use .some which is semantically more logical because it returns a boolean. Just reminder to myself.
				console.log("Book", book);
				await book.save();
				return book.populate("author");
			} catch (error) {
				console.error("error adding book", error);
				throw new GraphQLError("failed to add book");
			}
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("not authenticated");
			}
			const authors = await Author.find({});
			console.log("log authors", authors);

			const author = await Author.findOne({ name: args.name.trim() });
			console.log("author", typeof args.name);
			if (!author) {
				return null;
			}

			author.born = args.setBornTo;

			if (args.setBornTo > 2006) {
				throw new GraphQLError("choose a valid birth year", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.setBornTo,
					},
				});
			}

			try {
				await author.save();

				return author;
			} catch (error) {
				console.error("error updating", error);
				throw new Error("failed to update");
			}
		},
		createUser: async (root, args) => {
			console.log(args);
			try {
				const user = new User({
					username: args.username,
					favoriteGenre: args.favoriteGenre,
				});
				console.log(user);
				return user.save();
			} catch (error) {
				throw new GraphQLError("creating user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.username,
						error,
					},
				});
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw (
					(new GraphQLError("wrong credentials"),
					{
						extensions: {
							code: "BAD_USER_INPUT",
						},
					})
				);
			}

			const userForToken = {
				username: args.username,
				id: user._id,
			};
			console.log("token", userForToken);
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith("Bearer ")) {
			try {
				const decodedToken = jwt.verify(
					auth.substring(7),
					process.env.JWT_SECRET
				);
				const currentUser = await User.findById(decodedToken.id);
				return { currentUser };
			} catch (error) {
				console.error(error);
				return {};
			}
		}
		return {};
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
