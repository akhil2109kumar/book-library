import bookModel from "../models/book.model.js";
import myLibraryModel from "../models/myLibrary.model.js";
import checkIsLoggedIn from "../middleware/checkIsLoggedIn.js";
import errorHandler from "./error.controller.js";
import { createWriteStream } from "fs";
import mongoose from "mongoose";
import path from "path";
import { v4 } from "uuid";

const addBook = async (parent, args, context) => {
  const { title, author, date, coverImage } = args;
  const { file } = await coverImage;

  const { createReadStream, filename } = file;
  const fileExtension = filename.split(".").pop();
  const newFilename = `${v4()}.${fileExtension}`;

  const fileLocation = path.join("./uploads", newFilename);

  const stream = createReadStream();
  await stream.pipe(createWriteStream(fileLocation));

  try {
    const book = await bookModel.create({
      title,
      author,
      date: new Date(date),
      coverImage: newFilename,
    });
    return {
      status: "success",
      book,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ForbiddenError("Book already exist with title " + title);
    }
    errorHandler(error);
  }
};

const allBooks = async (parent, args, context) => {
  const { collection, sortBy, filterByTitle, filterByDate } = args;

  const books = await bookModel.find().populate({
    path: "reviews",
    populate: {
      path: "userId",
    },
  });

  let filteredBooks = books;
  console.log(filteredBooks);
  if (collection) {
    filteredBooks = filteredBooks.filter((book) =>
      book.reviews.some((review) => review.collect === collection)
    );
  }

  if (filterByTitle) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(filterByTitle.toLowerCase())
    );
  }
  if (filterByDate) {
    filteredBooks = filteredBooks.filter((book) => book.date === filterByDate);
  }

  if (sortBy) {
    switch (sortBy) {
      case "TITLE_ASC":
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "TITLE_DESC":
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "DATE_ASC":
        filteredBooks.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "DATE_DESC":
        filteredBooks.sort((a, b) => b.date.localeCompare(a.date));
        break;
      default:
    }
  }

  filteredBooks = calculateBookRatings(filteredBooks);
  return { status: "success", books: filteredBooks };
};

function calculateBookRatings(books) {
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let sumOfRatings = 0;

    for (let j = 0; j < book.reviews.length; j++) {
      sumOfRatings += book.reviews[j].rating;
    }
    let averageRating = sumOfRatings / book.reviews.length;
    book.avgRating = averageRating.toFixed(1);
  }

  return books;
}

const addToLibrary = async (
  parent,
  { input: { bookId } },
  { req, getAuthUser }
) => {
  await checkIsLoggedIn(req, getAuthUser);
  const user = await getAuthUser(req);

  try {
    let addLibrary = await myLibraryModel.findOne({
      userId: user._id,
      bookId: new mongoose.Types.ObjectId(bookId),
    });

    if (!addLibrary) {
      addLibrary = await myLibraryModel.create({
        userId: user._id,
        bookId: new mongoose.Types.ObjectId(bookId),
      });
    }

    console.log(addLibrary);
    const myLibrary = await myLibraryModel
      .findOne({ _id: addLibrary._id })
      .populate("userId")
      .populate("bookId");

    return {
      status: "success",
      myLibrary,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ForbiddenError("User already exist");
    }
    errorHandler(error);
  }
};

const addRatingAndStatus = async (
  parent,
  { input: { bookId, rating, collect } },
  { req, getAuthUser }
) => {
  await checkIsLoggedIn(req, getAuthUser);
  const user = await getAuthUser(req);

  try {
    const data = {
      userId: user._id,
      bookId: new mongoose.Types.ObjectId(bookId),
    };

    const addLibrary = await myLibraryModel.findOneAndUpdate(
      data,
      { $set: { collect, rating } },
      { upsert: true, new: true }
    );

    const myLibrary = await myLibraryModel
      .findOne({ _id: addLibrary._id })
      .populate("userId")
      .populate("bookId");

    return {
      status: "success",
      myBook: myLibrary,
    };
  } catch (error) {
    errorHandler(error);
  }
};

const myBooks = async (parent, args, { req, getAuthUser }) => {
  try {
    await checkIsLoggedIn(req, getAuthUser);
    const user = await getAuthUser(req);

    const myLibrary = await myLibraryModel
      .find({ userId: user._id })
      .populate("userId")
      .populate("bookId");

    return {
      status: "success",
      myBooks: myLibrary,
    };
  } catch (error) {
    errorHandler(error);
  }
};

export default {
  addBook,
  allBooks,
  addToLibrary,
  addRatingAndStatus,
  myBooks,
};
