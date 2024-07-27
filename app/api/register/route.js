import User from '@/app/models/User';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '../database/database';


export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password, role } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error registering user' }), { status: 500 });
  }
}