import { NextResponse } from 'next/server';
import Job from '@/app/models/Job';
import User from '@/app/models/User';
import nodemailer from 'nodemailer';
import { authenticate } from '@/app/middleware/auth';
import { authorizeRole } from '@/app/middleware/role';
import { connectToDatabase } from '../../database/database';

const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2';
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID; 
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

async function getZoomAccessToken() {
    const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching access token: ${response.statusText}`);
    }
  
    const data = await response.json();
    
    return data.access_token;
  }
async function createZoomMeeting(token, interviewDateTime) {
  const response = await fetch(`${ZOOM_API_BASE_URL}/users/me/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      topic: 'Job Interview',
      type: 2,
      start_time: interviewDateTime,
      duration: 30,
      timezone: 'UTC',
      settings: {
        join_before_host: true,
        mute_upon_entry: true,
        participant_video: true,
        host_video: true,
      },
    }),
  });

  const meeting = await response.json();
  return meeting;
}

export async function POST(request) {
  try {
    await authenticate(request);
    authorizeRole('poster')(request);

    const { jobId, candidateId, interviewDateTime } = await request.json();
    await connectToDatabase();

    const job = await Job.findById(jobId).populate('shortlistedCandidates');
    if (!job) {
      return new NextResponse(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }

    const candidate = job.shortlistedCandidates.find(c => c._id.toString() === candidateId);
    if (!candidate) {
      return new NextResponse(JSON.stringify({ error: 'Candidate not found in shortlist' }), { status: 404 });
    }

    // Get Zoom access token
    const accessToken = await getZoomAccessToken();

    // Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(accessToken, interviewDateTime);
    console.log(zoomMeeting)
    // Send interview email with Zoom meeting details
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
      text: `Dear ${candidate.name},\n\nYour interview for the position at ${job.company} has been scheduled on ${interviewDateTime}.\n\nJoin Zoom Meeting: ${zoomMeeting.join_url}\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Interview scheduled successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error scheduling interview' }), { status: 500 });
  }
}
