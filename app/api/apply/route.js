// app/api/apply/route.js
import { NextResponse } from 'next/server';
import Application from '@/app/models/Application';
import fs from 'fs'
import nodemailer from 'nodemailer';
import { connectToDatabase } from '../database/database';
import upload from '@/app/utils/multer';
import path from 'path';

export async function POST(request) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    const resume = formData.get('resume');

    const resumePath = path.join(process.cwd(), 'uploads', resume.filename)
    const fileStream = fs.createWriteStream(resumePath)
    resume.stream.pipe(fileStream)

    const newApplication = new Application({
        jobId: formData.get('jobId'),
        applicantName: formData.get('applicantName'),
        applicantEmail: formData.get('applicantEmail'),
        phoneNumber: formData.get('phoneNumber'),
        resume: resumePath,
        coverLetter: formData.get('coverLetter')
    });
    await newApplication.save();

    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.ENV.PASS,
        },
      });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: body.applicantEmail,
      subject: 'Job Application Confirmation',
      text: `Dear ${body.applicantName},\n\nThank you for applying to the job. We have received your application and will get back to you shortly.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error submitting application!' }, { status: 500 });
  }
}
