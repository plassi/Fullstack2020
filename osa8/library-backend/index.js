const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb://localhost:27017/library-apollo'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')

const typeDefs = gql`

  type Author {
    name: String!,
    born: Int,
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!,
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String!]!
      author: String!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}).populate('author'),
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ title: args.title, published: args.published, genres: args.genres })
      
      const authors = await Author.find({})
      const authorNames = authors.map(author => author.name)
      if (!authorNames.includes(args.author)) {
        const author = new Author({ name: args.author })
        await author.save()
        book.author = author 
      }

      
      return book.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})