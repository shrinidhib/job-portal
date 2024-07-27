import { NextResponse } from 'next/server';

import Job from '@/app/models/Job';
import { connectToDatabase } from '../../database/database';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';

export async function GET(request) {
  try {
    await authenticate(request)
    authorizeRole('poster')(request)
    await connectToDatabase();
    
    const userId = request.user.userId;
    console.log(userId)
    const j = await Job.find({ creator: userId })
    console.log(j)
    const jobs = await Job.find({ creator: userId }).populate('applications');
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching jobs and applications!' }, { status: 500 });
  }
}
