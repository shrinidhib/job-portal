"use client";
import PosterJob from '@/app/components/PosterJob';
import { useEffect, useState } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/jobs/poster', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setJobs(data.jobs);
        console.log(data.jobs)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Jobs and Applications</h1>
      {jobs && jobs.map((job) => (
        <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{job.title}</h2>
          <p className="text-gray-600 mt-2">{job.description}</p>
          <h3 className="text-xl font-medium text-gray-800 mt-4">Applications:</h3>
          <ul className="mt-4 space-y-4">
            {job.applications.map((application) => (
              <PosterJob application={application} jobId={job._id}/>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;
