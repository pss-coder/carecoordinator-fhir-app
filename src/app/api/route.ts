export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const BOT_TOKEN = "7174167825:AAHJ4TergSi7IFkZRkeHJx1_Iw9mMr4Jztc";
  const CHAT_ID = "@ocp_testt";
  const MESSAGE = "Hello, appointment is sent!";

  // Telegram API endpoint
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Data to be sent in the POST request
  const requestBody = {
    chat_id: CHAT_ID,
    text: MESSAGE,
  };

  // Options for the fetch request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  // Sending the message
  await fetch(TELEGRAM_API_URL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent successfully:", data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });

  return Response.json({ test: "hello world" });
}
