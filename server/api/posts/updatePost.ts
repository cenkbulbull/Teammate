import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = JSON.parse(body);

  try {
    const postId = parsedBody.id;

    const updatedPost = await Post.findOneAndUpdate(
      { id: postId },
      { $set: parsedBody },
      { new: true }
    );

    if (!updatedPost) {
      return { error: "Post bulunamadı." };
    }

    console.log(updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "Post güncelleme işleminde bir hata oluştu." };
  }
});
