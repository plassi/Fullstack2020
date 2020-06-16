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

const typeDefs = gql`

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!,
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
    allBooks(genre: String): [Book!]!
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
    allBooks: (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author')
      }

      return Book.find({ genres: { $in: [args.genre] } }).populate('author')
    },
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({ name: args.author })
      if (authors.length === 0) {
        const author = new Author({ name: args.author })
        await author.save()
        const book = new Book({ title: args.title, published: args.published, genres: args.genres, author: author })
        return book.save()
      } else {
        const book = new Book({ title: args.title, published: args.published, genres: args.genres, author: authors[0] })
        return book.save()
      }

    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        born: root.author.born
      }
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const books = await Book.find({})
      return books.filter(book => String(book.author) === String(root._id)).length
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