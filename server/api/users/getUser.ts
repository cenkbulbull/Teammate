import { defineEventHandler } from "h3";
import connectDB from "../../database/mongoose";
import User from "../../models/User";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const query = body.email ? { email: body.email } : { id: body.id };
    const user = await User.findOne(query);
    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Error fetching users" };
  }
});
