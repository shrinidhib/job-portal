import jwt from 'jsonwebtoken';

export async function authenticate(request) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}