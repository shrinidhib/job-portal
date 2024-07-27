"use client"

import Link from "next/link";



const JobDetails = ({id}) => {
  
  const job = { id, title: 'Frontend Developer', company: 'ABC Corp', description: 'Full job description here...' };

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
      <p>{job.description}</p>
      <Link href='/apply'>
        Apply now!
      </Link>
    </div>
  );
};

export default JobDetails;
