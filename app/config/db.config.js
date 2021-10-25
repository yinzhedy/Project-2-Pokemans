module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MySqlPassword01516170!!?",
    DB: "pokemans",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };