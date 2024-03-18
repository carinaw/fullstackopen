const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

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
			console.log("Author.find");
			const authors = await Author.find({}).populate("bookCount");
			return authors.map((author) => author.toObject());
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

			const book = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres,
			});
			// Could also use .some which is semantically more logical because it returns a boolean. Just reminder to myself.
			try {
				console.log("Book", book);
				await book.save();
				const populatedBook = await Book.findById(book._id).populate("author");

				pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
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
			// console.log("User.findOne");

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
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
