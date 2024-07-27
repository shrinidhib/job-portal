import { NextResponse } from 'next/server';
import Job from '@/app/models/Job';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';
import { connectToDatabase } from '../../database/database';

export async function POST(request) {
  try {
    await authenticate(request);
    authorizeRole('poster')(request);

    const { jobId, candidateId } = await request.json();
    await connectToDatabase();

    const job = await Job.findById(jobId);
    if (!job) {
      return new NextResponse(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }

    // Add candidate to shortlist
    job.shortlistedCandidates.push(candidateId);
    await job.save();

    return new NextResponse(JSON.stringify({ message: 'Candidate shortlisted successfully' }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'Error shortlisting candidate' }), { status: 500 });
  }
}
