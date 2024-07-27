import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET : process.env.JWT_SECRET ,
        EMAIL : process.env.EMAIL,
        PASS: process.env.PASS
      },
};

export default nextConfig;
