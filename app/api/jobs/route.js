import Job from '@/app/models/Job';
import { connectToDatabase } from '../database/database';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';



export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({})
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching jobs!" }), { status: 500 })
  }
}

export async function POST(request) {
  try {
    await authenticate(request)
    authorizeRole('poster')(request)
    
    await connectToDatabase();
    const body = await request.json()
    console.log(body)
    const newJob = new Job(body)
    console.log(newJob)
    await newJob.save()
    return new Response(JSON.stringify(newJob), { status: 201 }); 
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Error adding job!" }), { status: 500 });
  }
}