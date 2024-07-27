"use client";
import PosterJob from '@/app/components/PosterJob';
import { useEffect, useState } from 'react';
import EditJobModal from '@/app/components/EditJobModal'; 

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/jobs/poster', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId)); // Remove deleted job from state
        alert('Job deleted successfully');
      } else {
        alert('Error deleting job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Jobs and Applications</h1>
      {jobs && jobs.map((job) => (
        <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{job.title}</h2>
          <p className="text-gray-600 mt-2">{job.description}</p>
          <p className="text-gray-700 mt-4">Location: {job.location}</p>
          <p className="text-gray-700">Salary: ${job.salary}</p>
          <p className="text-gray-700">Duration: {job.duration}</p>
          <p className="text-gray-700">Job Type: {job.jobType}</p>
          <h3 className="text-xl font-medium text-gray-800 mt-4">Requirements:</h3>
          <ul className="list-disc ml-6 mt-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-700">{requirement}</li>
            ))}
          </ul>
          <h3 className="text-xl font-medium text-gray-800 mt-4">Applications:</h3>
          <ul className="mt-4 space-y-4">
            {job.applications.map((application) => (
              <PosterJob key={application._id} application={application} jobId={job._id}/>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={() => handleEdit(job)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
            >
              Edit Job
            </button>
            <button
              onClick={() => handleDelete(job._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Job
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && selectedJob && (
        <EditJobModal job={selectedJob} onClose={() => setIsModalOpen(false)} onUpdate={(updatedJob) => {
          setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
          setIsModalOpen(false);
        }} />
      )}
    </div>
  );
};

export default JobsPage;
