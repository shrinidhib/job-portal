import Job from '@/app/models/Job';
import { connectToDatabase } from '../database/database';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';
import Application from '@/app/models/Application';


export async function GET() {
    try {
      await connectToDatabase();
      const jobs = await Job.find({}).sort({ postedDate: -1 }).populate('applications');
      return new Response(JSON.stringify(jobs), { status: 200 });
    } catch (error) {
        console.log(error)
      return new Response(JSON.stringify({ error: "Error fetching jobs!" }), { status: 500 });
    }
  }
  

export async function POST(request) {
  try {
    await authenticate(request)
    authorizeRole('poster')(request)
    console.log(1)
    await connectToDatabase();
    const body = await request.json()
    console.log(body, request.user.userId)
    const nj = {...body, creator: request.user.userId}
    const newJob = new Job(nj)
    console.log(newJob)
    await newJob.save()
    return new Response(JSON.stringify(newJob), { status: 201 }); 
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Error adding job!" }), { status: 500 });
  }
}