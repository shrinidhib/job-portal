"use client";
import Link from 'next/link';
import { useJob } from '../../context/JobContext';
import { useRouter } from 'next/navigation';

const JobDetails = ({params}) => {
  const { selectedJob } = useJob();
  const {id}=params
  console.log(selectedJob)
  console.log(id)
  if (!selectedJob || selectedJob._id !== id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{selectedJob.title}</h1>
      <p>{selectedJob.company}</p>
      <p>{selectedJob.description}</p>
      <Link href={`/apply/${selectedJob._id}`}>
        Apply now!
      </Link>
    </div>
  );
};

export default JobDetails;
