import mongoose, { Schema } from "mongoose";

const UserSchema: Schema<User> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authMethod !== "google"; // Eğer authMethod 'google' ise gereksiz
    },
  },
  authMethod: {
    type: String,
    enum: ["credentials", "google"], // Kimlik doğrulama yöntemleri
    default: "credentials", // Varsayılan değer
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
    required: false,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  social: {
    type: Object as () => SocialLinks,
    required: false,
  },
  abilities: {
    type: [String],
    required: false,
  },
  jobs: {
    type: [String],
    required: false,
  },
  applied: {
    type: [String],
    required: false,
  },
  favorites: {
    type: [String],
    required: false,
  },
  emailNotification: {
    type: Boolean,
    default: true, // Varsayılan olarak e-posta bildirimleri açık
  },
});

const User = mongoose.model<User>("User", UserSchema);
export default User;
