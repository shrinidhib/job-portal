import jwt from 'jsonwebtoken';

export async function authenticate(request) {
  console.log(request.headers)
  const token = request.headers.get('Authorization')?.split(' ')[1];
  console.log("in auth",token)
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    console.log(request.user)
  } catch (error) {
    throw new Error('Invalid token');
  }
}