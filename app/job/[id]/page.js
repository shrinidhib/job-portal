"use client";
import Link from 'next/link';
import { useJob } from '../../context/JobContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const JobDetails = ({ params }) => {
  const { selectedJob, setSelectedJob } = useJob();
  const { id } = params;
  const router = useRouter();
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const convertToHTML = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br />'); // Line breaks
  };
  useEffect(() => {
    if (selectedJob && selectedJob._id === id) {
      const userId = localStorage.getItem('userId');
      if (userId && selectedJob.applications) {
        const applied = selectedJob.applications.some(app => app.applicantID === userId);
        setHasApplied(applied);
        setLoading(false);
      }
      if (!userId){
        alert("Please Login/Register first!")
        router.push('/login')
      }
    } else {
      setLoading(true);
    }
  }, [selectedJob, id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!selectedJob || selectedJob._id !== id) {
    return <div className="text-center text-gray-600">Job not found.</div>;
  }

  const { title, company, description, requirements, location, salary, duration, jobType, postedDate } = selectedJob;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-xl font-semibold text-gray-700 mt-2">{company}</p>
        <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: convertToHTML(description) }} />

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Job Details:</h2>
          <p className="mt-2 text-gray-600"><strong>Location:</strong> {location}</p>
          <p className="mt-2 text-gray-600"><strong>Salary:</strong> ${salary.toLocaleString()}</p>
          <p className="mt-2 text-gray-600"><strong>Duration:</strong> {duration}</p>
          <p className="mt-2 text-gray-600"><strong>Job Type:</strong> {jobType}</p>
          <p className="mt-2 text-gray-600"><strong>Posted Date:</strong> {new Date(postedDate).toLocaleDateString()}</p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Requirements:</h3>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          {hasApplied ? (
            <button className="inline-block px-6 py-3 bg-gray-500 text-white rounded-lg shadow cursor-not-allowed">
              Already Applied
            </button>
          ) : (
            <Link href={`/apply/${id}`} className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Apply now!
            </Link>
          )}
          <button
            onClick={() => router.back()}
            className="inline-block px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
