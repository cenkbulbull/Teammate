import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import Post from "../../models/Post";

connectDB();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // İstek gövdesini al
    const { filtered, page, limit } = body;

    let query = {}; // Sorgu nesnesini oluştur

    // Id or Title filter
    if (filtered?.postIdOrTitle) {
      const postIdOrTitle = filtered.postIdOrTitle;

      // Önce id ile arama yap
      const postById = await Post.findOne({ id: postIdOrTitle });

      if (postById) {
        return {
          posts: [postById], //id ile dönüş olunca diğer filtrelemeler çalışmayacak
        };
      } else {
        // Eğer id ile post bulunamazsa, title ile arama yap
        query.title = { $regex: postIdOrTitle, $options: "i" };
      }
    }

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

    // Location filter
    if (filtered?.location) {
      query.location = { $in: filtered.location }; // Belirtilen lokasyonları içeren postlar
    }

    let allPosts = await Post.find(query);

    // Sıralama işlemi
    if (filtered?.sort === "oldToNew") {
      allPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Artan sıralama
    } else if (filtered?.sort === "newToOld") {
      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Azalan sıralama
    } else {
      // Varsayılan olarak en yeni postları getir
      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Azalan sıralama
    }

    // Toplam kayıt sayısını al
    const totalPosts = allPosts.length; // Tüm postları say

    // Sayfalama işlemi
    const posts = allPosts.slice((page - 1) * limit, page * limit); // Sayfa için gereken postları al

    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit), // Toplam sayfa sayısını hesapla
      currentPage: page, // Mevcut sayfa
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
});
