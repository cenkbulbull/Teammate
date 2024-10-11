import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // İstek gövdesini al

    let allPosts = await Post.find();

    return {
      allPosts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
});
