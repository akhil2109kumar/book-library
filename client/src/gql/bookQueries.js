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

export const MY_BOOKS_QUERY = gql`
  query MyBooks {
    myBooks {
      status
      myBooks {
        id
        rating
        collect
        bookId {
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
    }
  }
`;

export const ADD_TO_LIBRARY = gql`
  mutation AddToLibrary($bookId: String!) {
    addToLibrary(input: {bookId: $bookId}) {
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

export const ADD_BOOKS_MUTATION = gql`
  mutation AddBook($title: String!, $author: String!, $coverImage: Upload!) {
    addBook(title: $title, author: $author, coverImage: $coverImage) {
      status
    }
  }
`;

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
      url
    }
  }
`;

export const ADD_RATING_AND_STATUS = gql`
mutation AddRatingAndStatus($input:RatingInput!) {
  addRatingAndStatus(input: $input) {
    status
  }
}`;
