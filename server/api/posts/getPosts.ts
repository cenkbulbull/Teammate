import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // İstek gövdesini al
    const { filtered } = body; // filtered değerini al

    let query = {}; // Sorgu nesnesini oluştur

    // Favorites filter
    if (
      filtered?.favorites &&
      Array.isArray(filtered.favorites) &&
      filtered.favorites.length > 0
    ) {
      query.id = { $in: filtered.favorites };
    }

    // Job time filter
    if (
      filtered?.jobTime &&
      Array.isArray(filtered.jobTime) &&
      filtered.jobTime.length > 0
    ) {
      query.estimatedJobTime = { $in: filtered.jobTime }; // Belirtilen iş sürelerini içeren postlar
    }

    // Posting time filter
    if (filtered?.postingTime) {
      let dateLimit;

      switch (filtered.postingTime) {
        case "last24hours":
          dateLimit = new Date(Date.now() - 24 * 60 * 60 * 1000);
          break;
        case "last7days":
          dateLimit = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          dateLimit = null; // Geçerli bir değer yoksa null
      }

      if (dateLimit) {
        query.createdAt = { $gte: dateLimit };
      }
    }

    //Location filter
    if (
      filtered?.location &&
      Array.isArray(filtered.location) &&
      filtered.location.length > 0
    ) {
      query.location = { $in: filtered.location }; // Belirtilen lokasyonları içeren postlar
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
