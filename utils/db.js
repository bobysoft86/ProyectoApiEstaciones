const mongoose = require("mongoose");


const connectMongo = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('conection to DB succefull', conn.connection.name)
  } catch (error) {
    console.log('ERROR: (f connect Mongo->', error.message);
  }
};

module.exports = connectMongo;