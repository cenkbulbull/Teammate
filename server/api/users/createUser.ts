import { defineEventHandler, readBody } from "h3";
import connectDB from "../../database/mongoose";
import User from "../../models/User";
import bcrypt from "bcrypt";

// MongoDB bağlantısını kur
connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // İstek gövdesini oku

    let hashedPassword;
    if (body.password) {
      hashedPassword = await bcrypt.hashSync(body.password, 10);
    }

    const newUser = new User({
      id: body.id,
      email: body.email,
      password: hashedPassword,
      authMethod: hashedPassword ? "credentials" : "google",
      firstname: body.firstname,
      lastname: body.lastname,
      biography: body.biography,
      job: body.job,
      telephone: body.telephone,
      resume: body.resume,
      profilePhoto: body.profilePhoto,
      social: body.social,
      abilities: body.abilities,
      jobs: body.jobs,
      applied: body.applied,
      favorites: body.favorites,
      emailNotification: body.emailNotification,
    });

    const savedUser = await newUser.save(); // Yeni kullanıcıyı kaydet
    return savedUser; // Kaydedilen kullanıcıyı döndür
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: "Error adding user" }; // Hata durumunda bir yanıt döndür
  }
});
