import query from "../../lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import adminDb from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt, chatId, model, session, language } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt! " });
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
  }
  let response = await query(
    `[No prose] [Output only JSON] You are a friendly chat bot. Please send your replies back only in ${language}. In addition, your replies should be in this specific JSON format: { "${language}": "", "english": "" }. Here is my prompt: ${prompt}`,
    model
  );
  if (response?.charAt(0) !== "{") {
    response = response?.slice(2);
  }
  const message: Message = {
    text: response || "ChatGPT could not find an answer for that",
    languageSelected: language,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };
  await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(message);
  res.status(200).json({ answer: message.text });
}
