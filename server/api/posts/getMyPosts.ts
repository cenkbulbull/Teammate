import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userId = body?.userId;

    let myPosts;

    myPosts = await Post.find({ user: userId });

    return {
      myPosts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
});
