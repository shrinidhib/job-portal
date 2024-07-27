import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
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
