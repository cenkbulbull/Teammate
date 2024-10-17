import { eventHandler } from "h3";
import { readMultipartFormData } from "h3";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import connectDB from "../../database/mongoose"; // MongoDB bağlantısı
import User from "../../models/User"; // User model
import { initializeApp } from "firebase/app";

const appConfig = useAppConfig();

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: appConfig.firebaseApiKey,
  authDomain: appConfig.firebaseAuthDomain,
  projectId: appConfig.firebaseProjectId,
  storageBucket: appConfig.firebaseStorageBucket,
  messagingSenderId: appConfig.firebaseMessagingSenderId,
  appId: appConfig.firebaseAppId,
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default eventHandler(async (event) => {
  const multipartFormData = await readMultipartFormData(event);

  const fileData = multipartFormData?.find((item) => item.name === "file");
  const userIdData = multipartFormData?.find((item) => item.name === "userId");

  const userId = userIdData?.data.toString();

  if (!fileData) {
    console.error("No file uploaded");
    return {
      status: "error",
      message: "No file uploaded",
    };
  }

  const { filename, type, data } = fileData;
  console.log("Uploading file:", filename, "Type:", type);

  const fileType = type;
  let newFilename = `${userId}-${filename}`;

  // MongoDB bağlantısını kur
  await connectDB();

  const user = await User.findOne({ id: userId });
  if (user) {
    console.log("User found:", user);
  } else {
    console.error("User not found:", userId);
  }

  const storageReference = storageRef(storage, `uploads/${newFilename}`);

  try {
    const blob = new Blob([data], { type: fileType });
    await uploadBytes(storageReference, blob);
    console.log("File uploaded successfully to Firebase Storage");

    // Dosya yüklendikten sonra URL'yi al
    const downloadURL = await getDownloadURL(storageReference);
    console.log("File available at:", downloadURL);

    const updateData = {};
    if (fileType.startsWith("image/")) {
      updateData.profilePhoto = downloadURL; // Resim URL'si kaydedilecek
    } else if (fileType === "application/pdf") {
      updateData.resume = downloadURL; // PDF URL'si kaydedilecek
    }

    // Kullanıcıyı güncelle
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found during update:", userId);
      return { error: "Kullanıcı bulunamadı." };
    }

    console.log("User updated successfully:", updatedUser);

    return {
      status: "success",
      message: "File uploaded and user updated successfully",
      filePath: downloadURL, // URL burada dönecek
      updatedUser,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Dosya yükleme işleminde bir hata oluştu." };
  }
});
