const { Router } = require("express");
const router = Router();
const bookController = require("../controllers/bookController");
const validate = require("../middleware/validations");
const { body, param } = require("express-validator");

router.get("/books", bookController.getBooks);
router.get(
  "/books/:id",
  validate([param("id").isInt().withMessage("id must be a number")]),
  bookController.getBooks
);
router.post(
  "/books",
  validate([
    body("name")
      .exists()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a String")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must minimum 3 characters and maximum 20 characters"),
  ]),
  bookController.createBook
);
module.exports = router;
