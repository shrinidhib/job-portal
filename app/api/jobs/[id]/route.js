import { NextResponse } from 'next/server';
import Job from '@/app/models/Job';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';
import { connectToDatabase } from '../../database/database';

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    await authenticate(request);
    authorizeRole('poster')(request);

    const { title, company, description, requirements, location, salary, duration, jobType } = await request.json();
    await connectToDatabase();

    const job = await Job.findById(id);
    if (!job) {
      return new NextResponse(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }

    job.title = title;
    job.company = company;
    job.description = description;
    job.requirements = requirements;
    job.location = location;
    job.salary = salary;
    job.duration = duration;
    job.jobType = jobType;

    await job.save();

    return new NextResponse(JSON.stringify(job), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'Error updating job' }), { status: 500 });
  }
}


export async function DELETE(request, { params }) {
    const { id } = params;
    try {
      await authenticate(request);
      authorizeRole('poster')(request);
  
      await connectToDatabase();
  
      const job = await Job.findByIdAndDelete(id);
      if (!job) {
        return new NextResponse(JSON.stringify({ error: 'Job not found' }), { status: 404 });
      }
  
      return new NextResponse(JSON.stringify({ message: 'Job deleted successfully' }), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ error: 'Error deleting job' }), { status: 500 });
    }
  }