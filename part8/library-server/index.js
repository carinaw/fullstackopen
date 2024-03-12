const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let books = [
	{
		title: "Galactic Odyssey",
		author: "Lena Orion",
		published: "2021",
		genres: ["Science Fiction", "Adventure"],
	},
	{
		title: "The Last Mage",
		author: "Erik Stormweaver",
		published: "2019",
		genres: ["Fantasy", "Epic"],
	},
	{
		title: "Quantum Shadows",
		author: "Claire Hastings",
		published: "2020",
		genres: ["Science Fiction", "Mystery"],
	},
	{
		title: "Empire of the Forgotten",
		author: "Diana Winters",
		published: "2018",
		genres: ["Fantasy", "Drama"],
	},
	{
		title: "Starlight Crusader",
		author: "Marcus Vega",
		published: "2022",
		genres: ["Science Fiction", "Action"],
	},
	{
		title: "The Dreaming Towers",
		author: "Sophie Green",
		published: "2017",
		genres: ["Fantasy", "Adventure"],
	},
	{
		title: "Nebula's Heart",
		author: "Ian Blackwood",
		published: "2023",
		genres: ["Science Fiction", "Romance"],
	},
	{
		title: "Chronicles of the Wind",
		author: "Natalie Windsong",
		published: "2015",
		genres: ["Fantasy", "Mythology"],
	},
	{
		title: "Voidwalkers",
		author: "Leo Night",
		published: "2022",
		genres: ["Science Fiction", "Horror"],
	},
	{
		title: "The Enchanted Forest",
		author: "Ava Moon",
		published: "2016",
		genres: ["Fantasy", "Young Adult"],
	},
];

let authors = [
	{
		name: "Lena Orion",
		born: "1985",
		bookCount: 5,
	},
	{
		name: "Erik Stormweaver",
		born: "1972",
		bookCount: 3,
	},
	{
		name: "Claire Hastings",
		born: "1988",
		bookCount: 7,
	},
	{
		name: "Diana Winters",
		born: "1990",
		bookCount: 4,
	},
	{
		name: "Marcus Vega",
		born: "1978",
		bookCount: 6,
	},
	{
		name: "Sophie Green",
		born: "1983",
		bookCount: 8,
	},
	{
		name: "Ian Blackwood",
		born: "1975",
		bookCount: 2,
	},
	{
		name: "Natalie Windsong",
		born: "1980",
		bookCount: 5,
	},
	{
		name: "Leo Night",
		born: "1987",
		bookCount: 3,
	},
	{
		name: "Ava Moon",
		born: "1992",
		bookCount: 4,
	},
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
