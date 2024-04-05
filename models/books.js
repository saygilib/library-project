module.exports = (sequelize, Sequelize) => {
  const books = sequelize.define(
    "books",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.FLOAT,
      },
      isBorrowed: {
        type: Sequelize.BOOLEAN,
      },
      scores: {
        type: Sequelize.JSON,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  return books;
};
