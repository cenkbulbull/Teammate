import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";
import { v4 as uuidv4 } from "uuid";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const newPost = new Post({
      id: uuidv4(),
      user: body.user,
      title: body.title,
      location: body.location,
      estimatedJobTime: body.estimatedJobTime,
      description: body.description,
      requirements: body.requirements || [],
    });

    const savedPost = await newPost.save();
    console.log(savedPost);
    return savedPost;
  } catch (error) {
    console.error("Error adding post:", error);
    return { error: "Error adding post" };
  }
});
