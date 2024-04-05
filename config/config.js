module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "burak",
    DB: "LibraryProject",
    dialect: "mysql",
    pool: {//pool configuration
      max: 10,//maximum number of connection in pool
      min: 0,//minimum number of connection in pool
      acquire: 30000,//maximum time in ms that pool will try to get connection before throwing error
      idle: 10000//maximum time in ms, that a connection can be idle before being released
    }
  };