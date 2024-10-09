import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const post = await Post.findOne({ id: body.id });
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
});
