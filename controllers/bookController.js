const db = require("../models");
const books = db.books;

module.exports.createBook = async (req, res) => {
  const { name } = req.body;
  const book = await books.create({
    name: name,
    scores: [],
  });
  try {
    if (book)
      return res.status(200).send({
        isSuccess: true,
        statusCode: 200,
        body: { id: book.id, name: book.name },
      });
    else
      return res.status(500).send({
        isSuccess: false,
        statusCode: 500,
        body: "Failed to create user",
      });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode: 500,
      body: error.message || "Some error occurred while creating the book",
    });
  }
};

module.exports.getBooks = async (req, res) => {
  const id = req.params.id;

  try {
    const book = id
      ? await books.findOne({
          where: { id: id },
          attributes: ["id", "name", "score"],
        })
      : await books.findAll({ attributes: ["id", "name"] });
    if (book) {
      return res.status(200).send({
        isSuccess: true,
        statusCode: 200,
        body: book,
      });
    } else {
      return res.status(404).send({
        isSuccess: false,
        statusCode: 404,
        body: "No book found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      statusCode: 500,
      body: error.message || "Some error occurred while retrieving the book",
    });
  }
};
