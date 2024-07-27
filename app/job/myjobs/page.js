"use client"
import { useEffect, useState } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
        const token = localStorage.getItem('token')
        console.log("here:", token)
      try {
        const response = await fetch('/api/jobs/poster',{
            headers:{
            'Authorization': `Bearer ${token}`}
        });
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>My Jobs and Applications</h1>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <h3>Applications:</h3>
          <ul>
            {job.applications.map((application) => (
              <li key={application._id}>
                <p>Name: {application.applicantName}</p>
                <p>Email: {application.applicantEmail}</p>
                <p>Phone: {application.phoneNumber}</p>
                <p>Cover Letter: {application.coverLetter}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;
