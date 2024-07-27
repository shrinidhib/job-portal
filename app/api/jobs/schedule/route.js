import { NextResponse } from 'next/server';

import Job from '@/app/models/Job';
import User from '@/app/models/User';
import nodemailer from 'nodemailer';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';
import { connectToDatabase } from '../../database/database';

export async function POST(request) {
  try {
    await authenticate(request);
    authorizeRole('poster')(request);

    const { jobId, candidateId, interviewDateTime } = await request.json();
    console.log(jobId, candidateId, interviewDateTime)
    await connectToDatabase();
    const j = await Job.findById(jobId)  
    console.log(j)  
    const job = await Job.findById(jobId).populate('shortlistedCandidates');
    console.log(job)
    if (!job) {
      return new NextResponse(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }

    const candidate = job.shortlistedCandidates.find(c => c._id.toString() === candidateId);
    if (!candidate) {
      return new NextResponse(JSON.stringify({ error: 'Candidate not found in shortlist' }), { status: 404 });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: candidate.email,
      subject: 'Interview Scheduled',
      text: `Dear ${candidate.name},\n\nYour interview for the position at ${job.company} has been scheduled on ${interviewDateTime}.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Interview scheduled successfully' }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: 'Error scheduling interview' }), { status: 500 });
  }
}
