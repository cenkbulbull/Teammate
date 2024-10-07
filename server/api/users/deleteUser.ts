import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import User from "../../models/User";

// MongoDB bağlantısını kur
connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const result = await User.deleteOne({ id: body.id }); // Belirtilen ID'ye göre kullanıcıyı sil
    if (result.deletedCount === 0) {
      return { error: "Kullanıcı bulunamadı veya silinemedi." };
    }
    return { message: "Kullanıcı başarıyla silindi." };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Kullanıcı silme işleminde bir hata oluştu." };
  }
});
