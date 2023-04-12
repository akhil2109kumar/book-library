import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  scalar Upload
  type Query {
    # Auth
    refreshAccessToken: TokenResponse!
    logoutUser: Boolean!

    # User
    getMe: UserResponse!

    # Book
    allBooks(
      collection: String
      sortBy: SortBy
      filterByTitle: String
      filterByDate: String
    ): AllBookResponse!

    myBooks: MyBookResponse!
  }

  enum SortBy {
    TITLE_ASC
    TITLE_DESC
    DATE_ASC
    DATE_DESC
  }

  type AllBookResponse {
    status: String!
    books: [AllBook!]
  }

  type AllBook {
    id: ID!
    title: String!
    author: String
    date: DateTime
    avgRating: Float!
    reviews: [myLibrary]
    coverImage: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type myLibrary {
    id: ID!
    rating: Float!
    collect: String!
    bookId: Book!
    userId: UserData!
  }

  type Book {
    id: ID!
    title: String!
    author: String
    date: DateTime
    coverImage: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type MyBookResponse {
    status: String!
    myBooks: [myLibrary]
  }

  type Mutation {
    # Auth
    loginUser(input: LoginInput!): TokenResponse!
    signupUser(input: SignUpInput!): UserResponse!

    # Book
    addBook(
      title: String!
      author: String!
      date: String!
      coverImage: Upload
    ): NewBookResponse!

    addToLibrary(input: AddToLibraryInput!): AddToLibraryResponse!
    addRatingAndStatus(input: RatingInput!): myBookResponse!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type TokenResponse {
    status: String!
    access_token: String!
  }

  type UserResponse {
    status: String!
    user: UserData!
  }

  type UserData {
    id: ID!
    name: String!
    email: String!
    photo: String!
    role: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type NewBookResponse {
    status: String!
    book: BookData!
  }

  type BookData {
    id: ID!
    title: String!
    author: String!
    date: String!
    coverImage: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AddToLibraryResponse {
    status: String!
    myLibrary: myLibrary!
  }

  input AddToLibraryInput {
    bookId: String!
  }

  input RatingInput {
    bookId: String!
    rating: String!
    collect: String!
  }

  type myBookResponse {
    status: String!
    myBook: myLibrary!
  }

  type RatingData {
    id: ID!
    userId: ID!
    bookId: ID!
    rating: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDefs;
