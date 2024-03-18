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
		bookCount: Int
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
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}

	type Subscription {
		bookAdded: Book!
	  }  
`;

module.exports = typeDefs;
