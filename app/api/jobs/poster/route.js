import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/database/database';
import Job from '@/app/models/Job';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const userId = request.headers.get('user-id');
    
    const jobs = await Job.find({ postedBy: userId }).populate('applications');
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching jobs and applications!' }, { status: 500 });
  }
}
