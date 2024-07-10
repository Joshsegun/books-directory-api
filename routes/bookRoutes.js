const express = require("express");
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect); // protect all the routes, only logged in user can access it

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(authController.restrictedtoAdmin, bookController.createBook);

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(authController.restrictedtoAdmin, bookController.updateBook)
  .delete(authController.restrictedtoAdmin, bookController.deleteBook);

module.exports = router;
