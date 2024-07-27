import { useState } from 'react';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    duration: '',
    jobType: 'full-time',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      const result = await response.json();
      console.log('Job posted:', result);
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        placeholder="Job Title"
        required
      />
      <input
        type="text"
        name="company"
        value={jobData.company}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />
      <textarea
        name="description"
        value={jobData.description}
        onChange={handleChange}
        placeholder="Job Description"
        required
      />
      <input
        type="text"
        name="requirements"
        value={jobData.requirements}
        onChange={handleChange}
        placeholder="Job Requirements"
        required
      />
      <input
        type="text"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="number"
        name="salary"
        value={jobData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
      />
      <input
        type="number"
        name="duration"
        value={jobData.duration}
        onChange={handleChange}
        placeholder="Duration"
        required
      />
      <select
        name="jobType"
        value={jobData.jobType}
        onChange={handleChange}
        required
      >
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
      </select>
      <button type="submit">Submit Job</button>
    </form>
  );
};

export default JobForm;
