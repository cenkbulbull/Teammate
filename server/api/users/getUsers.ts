import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import User from "../../models/User";

// MongoDB bağlantısını kur
connectDB();

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find(); // Tüm kullanıcıları çek
    return users; // Kullanıcıları döndür
  } catch (error) {
    console.error("Error fetching users:", error); // Hata durumunda konsola yazdır
    return { error: "Error fetching users" }; // Hata durumunda bir yanıt döndür
  }
});
