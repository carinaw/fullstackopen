const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let books = [
	{
		title: "Eloquent Javascript",
		author: "Marijn Haverbeke",
		published: "2010",
		genres: ["fun"],
	},
	{
		title: "GraphQL is awesome",
		author: "Carina Johansson",
		published: "2024",
		genres: ["tech"],
	},
	{
		title: "Data modelling is hard",
		author: "Carina Johansson",
		published: "2023",
		genres: ["future"],
	},
];

let authors = [
	{ name: "Marijn Haverbeke", born: 1980 },
	{ name: "Carina Johansson", born: 1991 },
	{ name: "Niklas Rasu" },
];

const typeDefs = `type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
}

type Book {
    title: String!
    author: Author!
    published: String
    genres: [String]
    id: ID!
}

type Author {
    name: String!
    bookCount: Int!
    born: Int
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
}`;

const resolvers = {
	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			let filteredBooks = books;

			if (args.author) {
				filteredBooks = filteredBooks.filter((b) => b.author === args.author);
			}
			if (args.genre) {
				filteredBooks = filteredBooks.filter((b) => b.genre === args.genre);
			}

			return filteredBooks;
		},
		allAuthors: () =>
			authors.map((author) => ({
				...author,
				bookCount: books.filter((book) => author.name === book.author).length,
			})),
	},
	Book: {
		author: (root) => {
			return {
				name: root.author,
				bookCount: books.filter((b) => b.author === root.author).length,
			};
		},
	},
	Mutation: {
		addBook: (root, args) => {
			const book = { ...args, id: uuid() };
			// Could also use .some which is semantically more logical because it returns a boolean. Just reminder to myself.

			if (!authors.find((author) => author.name === args.author)) {
				authors.push({ name: args.author, bookCount: 1 });
			}
			books = books.concat(book);

			return book;
		},
		editAuthor: (root, args) => {
			const author = authors.find((author) => author.name === args.name);

			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };
			authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
