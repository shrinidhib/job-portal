"use client"
import { useState , useEffect} from "react";

const PosterJob=({application, jobId, job})=>{
    
    const [shortlisted, setShortlisted] = useState(job.shortlistedCandidates.includes(application.applicantID)); 
    
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
          setShortlisted(true);
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
    {!shortlisted ? (
        <button
          onClick={() => handleShortlist(jobId, application.applicantID)}
          className="mt-4 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-opacity-90"
        >
          Shortlist
        </button>
      ):(
        <p className="mt-4 py-2 px-4 rounded-lg bg-green-500 text-white text-center">
          Shortlisted
        </p>
      )}
      
    {shortlisted && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const interviewDateTime = e.target.interviewDateTime.value;
          handleScheduleInterview(jobId, application.applicantID, interviewDateTime);
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
  </li>)
}

export default PosterJob;