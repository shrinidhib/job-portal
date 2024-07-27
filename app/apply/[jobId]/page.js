"use client"
import { useParams } from 'next/navigation';
import { useState } from 'react';

const Apply = () => {
  const {jobId} = useParams()
  const [formData, setFormData] = useState({
    jobId: jobId, 
    applicantName: '',
    applicantEmail: '',
    phoneNumber: '',
    resume: '',
    coverLetter: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Error submitting application.');
      }
    } catch (error) {
      alert('Error submitting application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="jobId" placeholder="Job ID" onChange={handleChange} required />
      <input type="text" name="applicantName" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="applicantEmail" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input type="text" name="resume" placeholder="Resume URL" onChange={handleChange} required />
      <textarea name="coverLetter" placeholder="Cover Letter" onChange={handleChange} required />
      <button type="submit">Apply</button>
    </form>
  );
};

export default Apply;
