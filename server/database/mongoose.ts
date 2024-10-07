import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(useRuntimeConfig().mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
