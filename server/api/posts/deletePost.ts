import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const result = await Post.deleteOne({ id: body.id }); // Belirtilen ID'ye göre post sil
    if (result.deletedCount === 0) {
      return { error: "Post bulunamadı veya silinemedi." };
    }
    return { message: "Post başarıyla silindi." };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Post silme işleminde bir hata oluştu." };
  }
});
