"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useJob } from './context/JobContext';

const HomePage = () => {
  const { jobs, setJobs, setSelectedJob } = useJob();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Error fetching jobs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.description}</p>
          <Link href={`/job/${job._id}`} onClick={() => handleViewDetails(job)}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
