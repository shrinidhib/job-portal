"use client";
import { useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Job Listings</h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-lg font-medium text-gray-600 mt-2">{job.company}</p>
              <p className="text-gray-700 mt-4">{job.description}</p>
              <Link href={`/job/${job._id}`} onClick={() => handleViewDetails(job)} 
                  className="mt-4 inline-block px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;
