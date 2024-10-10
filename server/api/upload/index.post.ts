import { eventHandler } from "h3";
import { readMultipartFormData } from "h3";
import fs from "fs";
import path from "path";
import connectDB from "../../database/mongoose"; // MongoDB bağlantısı
import User from "../../models/User"; // User model

export default eventHandler(async (event) => {
  const multipartFormData = await readMultipartFormData(event);

  // Dosya verisini almak için multipartFormData'nın ilk elemanını kontrol edin
  const fileData = multipartFormData?.find((item) => item.name === "file");
  const userIdData = multipartFormData?.find((item) => item.name === "userId");

  const userId = userIdData?.data.toString(); // Buffer'ı string'e dönüştürdük

  if (!fileData) {
    return {
      status: "error",
      message: "No file uploaded",
    };
  }

  // Yüklenen dosya bilgilerini çıkar
  const { filename, type, data } = fileData;

  const fileType = type; // Dosya türünü al
  let uploadPath;

  // Dosya adını rastgele bir ID ile güncelle
  const fileExtension = path.extname(filename); // Dosya uzantısını al
  const baseName = path.basename(filename, fileExtension); // Dosya adını uzantısı olmadan al
  const newFilename = `${baseName}-${userId}${fileExtension}`; // Yeni dosya adını oluştur

  // Dosya türüne göre uygun klasörü belirle
  if (fileType.startsWith("image/")) {
    uploadPath = path.join("public/uploads/images", newFilename);
  } else if (fileType === "application/pdf") {
    uploadPath = path.join("public/uploads/docs", newFilename);
  } else {
    return {
      status: "error",
      message: "Unsupported file type",
    };
  }

  // MongoDB bağlantısını kur
  await connectDB();

  // Kullanıcıyı bul ve önceki dosyasını sil
  const user = await User.findOne({ id: userId });
  if (user) {
    // Kullanıcının önceki dosyası varsa, sil
    if (fileType.startsWith("image/") && user.profilePhoto) {
      const previousImagePath = path.join(
        "public/uploads/images",
        user.profilePhoto
      );
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    } else if (fileType === "application/pdf" && user.resume) {
      const previousPdfPath = path.join("public/uploads/docs", user.resume);
      if (fs.existsSync(previousPdfPath)) {
        fs.unlinkSync(previousPdfPath);
      }
    }
  }

  // Klasör yoksa oluştur
  const dir = path.dirname(uploadPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Dosyayı kaydet
  fs.writeFileSync(uploadPath, data);

  const updateData = {};

  // Dosya türüne göre güncellemeleri belirle
  if (fileType.startsWith("image/")) {
    updateData.profilePhoto = newFilename; // Resim adı güncellenecek
  } else if (fileType === "application/pdf") {
    updateData.resume = newFilename; // PDF adı güncellenecek
  }

  // Kullanıcıyı güncelle
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return { error: "Kullanıcı bulunamadı." };
    }

    return {
      status: "success",
      message: "File uploaded and user updated successfully",
      filePath: uploadPath,
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Kullanıcı güncelleme işleminde bir hata oluştu." };
  }
});
