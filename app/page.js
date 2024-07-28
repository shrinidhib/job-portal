"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useJob } from './context/JobContext';

const HomePage = () => {
  const { jobs, setJobs, setSelectedJob } = useJob();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

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
  }, [setJobs]);

  useEffect(() => {
    const applyFilters = () => {
      if (!searchQuery) {
        setFilteredJobs(jobs);
        return;
      }

      const lowercasedQuery = searchQuery.toLowerCase();
      const updatedJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(lowercasedQuery) ||
        job.description.toLowerCase().includes(lowercasedQuery) ||
        job.requirements.some(req => req.toLowerCase().includes(lowercasedQuery)) ||
        job.duration.toLowerCase().includes(lowercasedQuery)
      );

      setFilteredJobs(updatedJobs);
    };

    applyFilters();
  }, [searchQuery, jobs]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Job Listings</h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for jobs"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full"
        />
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-lg font-medium text-gray-600 mt-2">{job.company}</p>
              <p className="text-gray-700 mt-4">{job.description.slice(0, 30)}...</p>
              <div className="mt-4">
                <p className="text-gray-600">Posted on: {formatDate(job.postedDate)}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements.map((requirement, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {requirement}
                  </span>
                ))}
              </div>
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
