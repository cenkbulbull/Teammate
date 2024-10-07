import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import User from "../../models/User";

// MongoDB bağlantısını kur
connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = JSON.parse(body);

  try {
    const userId = parsedBody.id; // Kullanıcı ID'sini al

    // Kullanıcıyı güncelle
    const updatedUser = await User.findOneAndUpdate(
      { id: userId }, // Güncellenecek kullanıcıyı bul
      { $set: parsedBody }, // Gövdeyi güncelle
      { new: true } // Güncellenmiş belgeyi döndür
    );

    if (!updatedUser) {
      return { error: "Kullanıcı bulunamadı." }; // Eğer kullanıcı bulunamazsa hata döndür
    }

    console.log(updatedUser);

    return updatedUser; // Güncellenen kullanıcıyı döndür
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Kullanıcı güncelleme işleminde bir hata oluştu." }; // Hata durumunda yanıt döndür
  }
});
