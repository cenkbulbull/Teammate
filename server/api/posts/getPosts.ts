import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // İstek gövdesini al
    const { filtered } = body; // filtered değerini al

    let query = {}; // Sorgu nesnesini oluştur

    // Eğer favorites dizisi varsa, sorguya ekle
    if (
      filtered?.favorites &&
      Array.isArray(filtered.favorites) &&
      filtered.favorites.length > 0
    ) {
      query.id = { $in: filtered.favorites };
    }

    let posts = await Post.find(query);

    //Sorting
    if (filtered?.sort === "oldToNew") {
      posts = posts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ); // Artan sıralama
    } else if (filtered?.sort === "newToOld") {
      posts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Azalan sıralama
    } else {
      // Varsayılan olarak en yeni postları getir
      posts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Azalan sıralama
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
});
