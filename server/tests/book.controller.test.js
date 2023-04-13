import bookController from "../controllers/book.controller";
import bookModel from "../models/book.model.js";

const mockReadStream = jest.fn(() => ({
  pipe: jest.fn(),
}));

jest.mock("fs", () => ({
  createWriteStream: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

jest.mock("../models/book.model.js", () => ({
  create: jest.fn(() => ({
    _id: "test-book-id",
    title: "Test Book Title",
    author: "Test Book Author",
    date: new Date(),
    coverImage: "test-book-cover-image.jpg",
  })),
}));

jest.mock("../models/book.model.js");

describe("addBook", () => {
  it("should create a new book and return success", async () => {
    const mockContext = {};
    const args = {
      title: "Test Book Title",
      author: "Test Book Author",
      date: "2022-01-01",
      coverImage: {
        file: {
          createReadStream: mockReadStream,
          filename: "test-book-cover-image.jpg",
        },
      },
    };

    const result = await bookController.addBook(null, args, mockContext);

    expect(bookModel.create).toHaveBeenCalledWith({
      title: "Test Book Title",
      author: "Test Book Author",
      date: new Date("2022-01-01"),
      coverImage: "test-uuid.jpg",
    });
    expect(mockReadStream).toHaveBeenCalled();
    expect(result).toEqual({
      status: "success",
      book: {
        _id: "test-book-id",
        title: "Test Book Title",
        author: "Test Book Author",
        date: expect.any(Date),
        coverImage: "test-book-cover-image.jpg",
      },
    });
  });

  it("should throw an error if the book already exists", async () => {
    const bookModel = require("../models/book.model.js");
    bookModel.create.mockImplementationOnce(() => {
      const error = new Error("Book already exists");
      error.code = 11000;
      throw error;
    });

    const mockContext = {};
    const args = {
      title: "Test Book Title",
      author: "Test Book Author",
      date: "2022-01-01",
      coverImage: {
        file: {
          createReadStream: mockReadStream,
          filename: "test-book-cover-image.jpg",
        },
      },
    };

    await expect(
      bookController.addBook(null, args, mockContext)
    ).rejects.toThrow("Book already exist with title Test Book Title");
  });
});
