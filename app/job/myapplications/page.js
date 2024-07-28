"use client";
import PosterJob from '@/app/components/PosterJob';
import { useEffect, useState } from 'react';
import EditJobModal from '@/app/components/EditJobModal'; 

const ApplicationsPage = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/apply', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setApps(data.applications);
        } else {
          console.error('Error fetching applications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Applications</h1>
      {apps.length > 0 ? (
        apps.map((application) => (
          <div key={application._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">{application.jobId.title}</h2>
            <p className="text-gray-600 mt-2">{application.jobId.description}</p>
            <p className="text-gray-700 mt-4">Location: {application.jobId.location}</p>
            <p className="text-gray-700">Salary: ${application.jobId.salary}</p>
            <p className="text-gray-700">Duration: {application.jobId.duration}</p>
            <p className="text-gray-700">Job Type: {application.jobId.jobType}</p>
            <h3 className="text-xl font-medium text-gray-800 mt-4">Requirements:</h3>
            <ul className="list-disc ml-6 mt-2">
              {application.jobId.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-700">{requirement}</li>
              ))}
            </ul>
            <h3 className="text-xl font-medium text-gray-800 mt-4">Application Details:</h3>
            <p className="text-gray-700 mt-2">Name: {application.applicantName}</p>
            <p className="text-gray-700">Email: {application.applicantEmail}</p>
            <p className="text-gray-700">Phone: {application.phoneNumber}</p>
            <p className="text-gray-700">Cover Letter: {application.coverLetter}</p>
            <p className="text-gray-700">Resume:<a
          href={new URL(`/uploads/${application.resume}`, window.location.origin).href}
          download
          className="text-blue-500 hover:underline"
        > View Resume</a></p>
            <p className="text-gray-700">Applied At: {new Date(application.appliedAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationsPage;
