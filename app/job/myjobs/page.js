"use client";
import { useEffect, useState } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [shortlisted, setShortlisted] = useState(null); // To track shortlisted status per job

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

  async function handleShortlist(jobId, candidateId) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/jobs/shortlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jobId, candidateId }),
    });

    if (response.ok) {
      const result = await response.json();
      setShortlisted(jobId); // Update shortlisted status per job
      alert(result.message || result.error);
    }
  }

  async function handleScheduleInterview(jobId, candidateId, interviewDateTime) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/jobs/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jobId, candidateId, interviewDateTime }),
    });

    const result = await response.json();
    alert(result.message || result.error);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Jobs and Applications</h1>
      {jobs.map((job) => (
        <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{job.title}</h2>
          <p className="text-gray-600 mt-2">{job.description}</p>
          <h3 className="text-xl font-medium text-gray-800 mt-4">Applications:</h3>
          <ul className="mt-4 space-y-4">
            {job.applications.map((application) => (
                
              <li key={application._id} className="border border-gray-300 p-4 rounded-lg bg-gray-50">
                <p className="font-medium text-gray-700">Name: {application.applicantName}</p>
                <p className="text-gray-600">Email: {application.applicantEmail}</p>
                <p className="text-gray-600">Phone: {application.phoneNumber}</p>
                <p className="text-gray-600">Cover Letter: {application.coverLetter}</p>
                <div className="mt-4">
                  <p className="font-medium text-gray-700">Resume:</p>
                  {application.resume ? (
                    <a
                      href={new URL(`/uploads/${application.resume}`, window.location.origin).href}
                      download
                      className="text-blue-500 hover:underline"
                    >
                      Download Resume
                    </a>
                  ) : (
                    <p>No resume available</p>
                  )}
                </div>
                <button
                  onClick={() => handleShortlist(job._id, application._id)}
                  className={`mt-4 py-2 px-4 rounded-lg ${shortlisted === job._id ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} hover:bg-opacity-90`}
                >
                  {shortlisted === job._id ? 'Shortlisted' : 'Shortlist'}
                </button>
                {shortlisted === job._id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const interviewDateTime = e.target.interviewDateTime.value;
                      handleScheduleInterview(job._id, application._id, interviewDateTime);
                    }}
                    className="mt-4"
                  >
                    <input
                      type="datetime-local"
                      name="interviewDateTime"
                      required
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                    />
                    <button
                      type="submit"
                      className="mt-2 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Schedule Interview
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;
