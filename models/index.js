const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const Joi = require("joi");
const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;
db.users = require("./users")(sequelizeInstance, Sequelize);
db.books = require("./books")(sequelizeInstance, Sequelize);
db.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(user);
};

db.validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(book);
};
module.exports = db;
