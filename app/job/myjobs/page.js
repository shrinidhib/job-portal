"use client"
import { useEffect, useState } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [shortlisted, setShortlisted]=useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
        const token = localStorage.getItem('token')
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
  async function handleShortlist(jobId, candidateId) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/jobs/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ jobId, candidateId }),
    });
  
    
    if (response.ok){
        
        const result = await response.json();
        setShortlisted(true)
        alert(result.message || result.error);
    }
   
  }
  async function handleScheduleInterview(jobId, candidateId, interviewDateTime) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/jobs/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ jobId, candidateId, interviewDateTime }),
    });
  
    const result = await response.json();
    alert(result.message || result.error);
  }

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
                <button onClick={() => handleShortlist(job._id,  application.applicantID)}>{shortlisted? 'Shortlisted' : 'Shortlist'}</button>
                {shortlisted && 
          <form onSubmit={(e) => {
                e.preventDefault();
                const interviewDateTime = e.target.interviewDateTime.value;
                handleScheduleInterview(job._id, application.applicantID, interviewDateTime);
            }}>
                <input type="datetime-local" name="interviewDateTime" required />
                <button type="submit">Schedule Interview</button>
            </form>}
              </li>
            ))}
            
          
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;

  
  