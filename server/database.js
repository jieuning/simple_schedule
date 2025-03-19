const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnitfiedTopology: true,
    });

    console.log("mongoDB Connected!");
  } catch (error) {
    console.log("MongoDB Connection Error: ", error);
    process.exit(1); // 실패시 프로세스 종료
  }
}

module.exports = connectDB;
