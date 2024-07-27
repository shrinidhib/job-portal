import mongoose from 'mongoose';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      
      useUnifiedTopology: true,
    });
    const db = client.connection.db;
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to connect to MongoDB');
  }
}
