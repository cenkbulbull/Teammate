import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const { sendMail } = useNodeMailer();

  const confirmationCode = Math.floor(10000 + Math.random() * 90000).toString();

  try {
    await sendMail({
      subject: "Teammate Confirmation",
      text: `Your confirmation code is: ${confirmationCode}`,
      to: email,
    });

    return {
      status: "success",
      message: "Email sent successfully!",
      confirmationCode,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error sending email" };
  }
});
