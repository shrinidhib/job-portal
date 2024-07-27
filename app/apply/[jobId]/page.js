"use client"
import { useParams } from 'next/navigation';
import { useState } from 'react';

const Apply = ({params}) => {
  const {jobId}=params
  console.log("in apply" , jobId)
  const [formData, setFormData] = useState({
    jobId: jobId, 
    applicantName: '',
    applicantEmail: '',
    phoneNumber: '',
    resume: null,
    coverLetter: '',
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append('jobId', jobId);
    data.append('applicantName', formData.applicantName);
    data.append('applicantEmail', formData.applicantEmail);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('resume', formData.resume); // File upload
    data.append('coverLetter', formData.coverLetter);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Error submitting application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="applicantName" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="applicantEmail" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input type="file" name="resume" placeholder="Resume URL" onChange={handleChange} required />
      <textarea name="coverLetter" placeholder="Cover Letter" onChange={handleChange} required />
      <button type="submit">Apply</button>
    </form>
  );
};

export default Apply;
