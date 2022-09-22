const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DATABASE_URI);
    await mongoose.connect(process.env.TECHNOTE_LOCAL_DB);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
