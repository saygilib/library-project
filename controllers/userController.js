const db = require("../models");
const { users, books} = db;
module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = id
      ? await users.findOne({
          where: { id: id },
        })
      : await users.findAll({
          attributes: ["id", "name"],
        });
    if (user) {
      return res.status(200).send({
        isSuccess: true,
        statusCode: 200,
        body: user,
      });
    } else {
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "No user found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode: 500,
      body: error.message || "Some error occurred while retrieving user",
    });
  }
};

module.exports.createUser = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await users.create({
      name: name,
      books: {
        past: [],
        present: [],
      },
    });
    if (user)
      return res.status(200).send({
        isSuccess: true,
        statusCode: 200,
        body: user,
      });
    else
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "Failed to create user",
      });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode: 500,
      body: error.message || "Some error occurred while creating user",
    });
  }
};

module.exports.borrowBook = async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  try {
    const user = await users.findByPk(userId);
    if (!user)
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "User not found",
      });

    const book = await books.findByPk(bookId);
    if (!book)
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "Book not found",
      });
    if (book.isBorrowed)
      return res.status(401).send({
        isSuccess: false,
        statusCode: 401,
        body: "Book is already borrowed",
      });
    const newbooks = user.books;

    newbooks.present.push({ id: book.id, name: book.name });

    await user.set({ books: newbooks });
    await book.set({ isBorrowed: true });
    user.changed("books", true);
    book.changed("isBorrowed", true);
    await user.save();
    await book.save();
    return res.status(200).send({
      isSuccess: true,
      statusCode: 200,
      body: "user borrowed the book successfully",
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode: 500,
      body: error.message || "Some error occurred while borrowing book",
    });
  }
};

module.exports.returnBook = async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  const { score } = req.body;
  try {
    const user = await users.findByPk(userId);
    if (!user)
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "User not found",
      });

    const book = await books.findByPk(bookId);

    if (!book)
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "Book not found",
      });
    if (!book.isBorrowed)
      return res.status(401).send({
        isSuccess: false,
        statusCode: 401,
        body: "Book is not borrowed",
      });
    if (user.books.present.filter((book) => book.id == bookId).length < 1)
      return res.status(401).send({
        isSuccess: false,
        statusCode: 401,
        body: "Book is not borrowed by this user",
      });

    const present = user.books.present.filter((book) => book.id != bookId);
    const past = user.books.past;
    const scores = book.scores || [];
    past.push({ id: book.id, name: book.name, userScore: score });
    await user.set({ books: { past: past, present: present } });
    user.changed("books", true);
    scores.push(score);
    await book.set({
      isBorrowed: false,
      scores: scores,
      score:
        scores.reduce((sum, currentValue) => sum + currentValue, 0) /
        scores.length,
    });
    book.changed("scores", true);
    book.changed("isBorrowed", true);
    book.changed("score", true);
    await user.save();
    await book.save();
    return res.status(200).send({
      isSuccess: true,
      statusCode: 200,
      body: "user returned the book successfully",
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode:500,
      body: error.message || "Some error occurred while borrowing book",
    });
  }
};
