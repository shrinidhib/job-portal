import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '../database/database';
import Application from '@/app/models/Application';
import { authenticate } from '@/app/middleware/auth';
import crypto from 'crypto';
import Job from '@/app/models/Job';

export async function POST(request) {
  try {
    await connectToDatabase();
    await authenticate(request);

    const formData = await request.formData();
    const resume = formData.get('resume');
    console.log(resume)

    if (resume && resume instanceof File) {
      const uniqueFilename = crypto.randomBytes(16).toString('hex') + path.extname(resume.name);
      const resumePath = path.join(process.cwd(), 'uploads', uniqueFilename);

      const uploadDir = path.dirname(resumePath);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileStream = fs.createWriteStream(resumePath);
      const reader = resume.stream().getReader();

      reader.read().then(async function processText({ done, value }) {
        if (done) {
          fileStream.end();
          return;
        }
        fileStream.write(value);
        reader.read().then(processText);
      });

      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });

      console.log(`File saved to: ${resumePath}`);
      
      const newApplication = new Application({
        jobId: formData.get('jobId'),
        applicantName: formData.get('applicantName'),
        applicantEmail: formData.get('applicantEmail'),
        applicantID : request.user.userId,
        phoneNumber: formData.get('phoneNumber'),
        resume: resumePath, 
        coverLetter: formData.get('coverLetter'),
      });

      const savedApplication = await newApplication.save();

      // Add the new application's ID to the job's applications array
      await Job.findByIdAndUpdate(
        formData.get('jobId'),
        { $push: { applications: savedApplication._id } },
        { new: true, useFindAndModify: false }
      );

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
        to: formData.get('applicantEmail'),
        subject: 'Job Application Confirmation',
        text: `Dear ${formData.get('applicantName')},\n\nThank you for applying to the job. We have received your application and will get back to you shortly.\n\nBest regards,\nThe Team`,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Resume file is required!' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error submitting application!' }, { status: 500 });
  }
}
