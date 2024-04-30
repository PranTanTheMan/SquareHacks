import fs from "fs";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbeddings() {
  const menuData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));

  const embeddings = await Promise.all(
    menuData.map(async (item: any) => {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: `${item.title} - ${item.description}`,
        encoding_format: "float",
      });
      return response.data[0].embedding;
    })
  );

  return embeddings;
}
