import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGO_URI, // Example of making a variable available in the app
      },
};

export default nextConfig;
