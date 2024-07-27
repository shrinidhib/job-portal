import Link from 'next/link';

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.description}</p>
          <Link href={`/job/${job.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;
