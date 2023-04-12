import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
import bookController from "../controllers/book.controller.js";

export default {
  // Users
  getMe: userController.getMe,
  // Auth
  refreshAccessToken: authController.refreshAccessToken,
  logoutUser: authController.logoutHandler,

  //Book
  allBooks: bookController.allBooks,
  myBooks: bookController.myBooks,
};
