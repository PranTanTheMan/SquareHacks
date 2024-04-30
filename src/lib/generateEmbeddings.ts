import { promises as fs } from "fs";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbeddings() {
  const file = await fs.readFile(process.cwd() + "./menu.json", "utf8");
  const menuData = JSON.parse(file);

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
