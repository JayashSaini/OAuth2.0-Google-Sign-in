const mongoose = require("mongoose");

exports.connectMongodb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((e) =>
      console.log("✅ MongoDB connected successfully", e.connection.host)
    )
    .catch((e) =>
      console.log(
        e.message || "Something went wrong while connecting to MongoDB"
      )
    );
};
