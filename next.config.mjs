import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET ,
        EMAIL : process.env.EMAIL,
        PASS: process.env.PASS,
        ZOOM_ACCOUNT_ID: process.env.ZOOM_ACCOUNT_ID,
        ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
        ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
        API_KEY: process.env.API_KEY
      },
};

export default nextConfig;
