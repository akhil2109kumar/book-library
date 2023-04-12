import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
query AllBooks {
  allBooks {
      status
      books {
        id
        title
        author
        date
        avgRating
        coverImage
        createdAt
        updatedAt
      }
  }
}`;

export const UPDATE_RATING_COLLECTIONS = gql`
mutation AddToLibrary($bookId: String!, $userId: String!, $collect: String!, $rating: Int!) {
  addToLibrary(input: {bookId: $bookId, userId: $userId, collect: $collect, rating: $rating}) {
    status
    myLibrary {
      id
      rating
      collect
      bookId {
        id
        title
        author
        date
        coverImage
        createdAt
        updatedAt
      }
      userId {
        id
        name
        email
        photo
        role
        createdAt
        updatedAt
      }
    }
  }
}`;

export const MY_BOOKS_MUTATION = gql`
  mutation MyBooks($userId: String!) {
    myBooks(input: {userId: $userId}) {
      status
      myLibrary {
        id
        rating
        collect
        bookId {
          id
          title
          author
          date
          coverImage
          createdAt
          updatedAt
        }
      }
    }
  }
`;