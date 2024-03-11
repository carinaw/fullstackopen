const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

let books = [
	{
		title: "Eloquent Javascript",
		author: "Marijn Haverbeke",
		published: "2010",
		genre: "fun",
	},
	{
		title: "GraphQL is awesome",
		author: "Carina Johansson",
		published: "2024",
		genre: "tech",
	},
	{
		title: "Data modelling is hard",
		author: "Carina Johansson",
		published: "2023",
		genre: "future",
	},
];

let authors = [
	{ name: "Marijn Haverbeke" },
	{ name: "Carina Johansson" },
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
    genre: String
}

type Author {
    name: String!
    bookCount: Int!
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
