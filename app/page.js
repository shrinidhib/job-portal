import JobList from '../components/JobList';

const HomePage = () => {
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'ABC Corp', description: 'Work on web applications' },
    { id: 2, title: 'Backend Developer', company: 'XYZ Inc', description: 'Build server-side logic' },
  ];

  return (
    <div>
      <h1>Job Openings</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;
