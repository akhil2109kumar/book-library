import authController from "../controllers/auth.controller.js";
import bookController from "../controllers/book.controller.js";

export default {
  // Auth
  signupUser: authController.signup,
  loginUser: authController.login,

  // Book
  addBook: bookController.addBook,
  addToLibrary: bookController.addToLibrary,
  addRatingAndStatus: bookController.addRatingAndStatus,
};
