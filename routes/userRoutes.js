const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const validate = require("../middleware/validations");
const { body, param } = require("express-validator");

router.get("/users", userController.getUser);
router.get(
  "/users/:id",
  validate([param("id").isInt().withMessage("id must be a number")]),
  userController.getUser
);
router.post(
  "/users",
  validate([
    body("name")
      .exists()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a String")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must minimum 3 characters and maximum 20 characters"),
  ]),
  userController.createUser
);
router.post(
  "/users/:userId/borrow/:bookId",
  validate([
    param("userId").exists().isInt().withMessage("userId must be a number"),
    param("bookId").exists().isInt().withMessage("bookId must be a number"),
  ]),
  userController.borrowBook
);
router.post(
  "/users/:userId/return/:bookId",
  validate([
    param("userId").exists().isInt().withMessage("userId must be a number"),
    param("bookId").exists().isInt().withMessage("bookId must be a number"),
    body("score")
      .exists()
      .withMessage("Score is required")
      .isNumeric()
      .withMessage("Score must be a number"),
  ]),
  userController.returnBook
);

module.exports = router;
