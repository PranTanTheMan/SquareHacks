import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAI } from "openai";
import fs from "fs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { generateEmbeddings } from "@/lib/generateEmbeddings";
import { cosineSimilarity } from "@/lib/cosineSimiliarity";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const OpenAiEmbed = new OpenAI();

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    console.log(messages);

    const userMessage = messages[messages.length - 1].content;

    const userEmbeddingResponse = await OpenAiEmbed.embeddings.create({
      model: "text-embedding-3-small",
      input: userMessage,
      encoding_format: "float",
    });
    const userEmbedding = userEmbeddingResponse.data[0].embedding;

    const menuEmbeddings = await generateEmbeddings();

    const similarities = menuEmbeddings.map((embedding) =>
      cosineSimilarity(userEmbedding, embedding)
    );
    const bestMatchIndex = similarities.indexOf(Math.max(...similarities));

    const menuData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
    const bestMatchItem = menuData[bestMatchIndex];

    const assistantMessage = `${bestMatchItem.title} is a great choice! ${bestMatchItem.description}. The price is $${bestMatchItem.price}. Let me know if you need anything else or if you're ready to proceed with the checkout.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. You explain about dishes and help to make the checkout process for customers. When a user names a dish you are gonna start with that name of that dish followed by a short description telling its a good choice and ask it if he needs anything else. Do not suggest another dish that the client didnt mention, only suggest when they ask for recommendations.",
        },
        ...messages,
        {
          role: "assistant",
          content: assistantMessage,
        },
      ],
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
