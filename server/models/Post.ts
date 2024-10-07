import mongoose, { Schema } from "mongoose";

// Job interface'ini kullanarak bir Mongoose Schema oluştur
const PostSchema: Schema<Job> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Varsayılan olarak şu anki tarih
  },
  user: {
    type: String,
    //required: true, // Kullanıcı ID'si gereklidir
    default: "0de27e53-9ee3-4883-8d4e-6928ed42e9f6", //giriş yapan kullanıcının idsi olacak
  },
  title: {
    type: String,
    required: true, // İş başlığı gereklidir
  },
  location: {
    type: String,
    required: true, // Lokasyon gereklidir
  },
  estimatedJobTime: {
    type: String,
    required: true, // Tahmini iş süresi gereklidir
  },
  description: {
    type: String,
    required: true, // Açıklama gereklidir
  },
  requirements: {
    type: [String], // Gereksinimler dizi olarak tanımlanır
    required: false, // Gereksinimler isteğe bağlıdır
  },
});

// Modeli oluştur
const Post = mongoose.model<Job>("Post", PostSchema);
export default Post;
