import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


const chatGptIndex = pc.Index("chat-gpt");

export async function createMemory({ vectors, metaData, messageId }) {
  await chatGptIndex.upsert([
    {
      id: messageId,
      values: vectors,
      metadata: metaData,
    },
  ]);
}

export async function queryMemory({ queryVector, limit = 5, metadata }) {
  const results = await chatGptIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ?  metadata  : undefined,
    includeMetadata: true,
  });
  return results.matches;
}
