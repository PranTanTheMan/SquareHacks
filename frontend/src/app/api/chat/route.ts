import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
    try{
        const { messages } = await request.json();

        console.log(messages);

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                { role: "system", content: "You are a helpful assistant. You explain about dishes and help to make the checkout process for customers. When a user names a dish you are gonna start with that name of that dish followed by a short description telling its a good choice and ask it if he needs anything else. Do not suggest another dish that the client didnt mention, only suggest when they ask for recommendations."},
                ...messages
            ],
            
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);
    } catch(error) {
        console.log(error);
    }
}
