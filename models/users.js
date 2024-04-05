module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        required: true,

      }
      ,
      books:{
        type: Sequelize.JSON,
      }
      
    },{
      createdAt: false,
      updatedAt: false,
    });
  
    return users;
  };
  

