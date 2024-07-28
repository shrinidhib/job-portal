"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Apply = ({ params }) => {
  const { jobId } = params;
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
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

   
    const data = new FormData();
    data.append('jobId', jobId);
    data.append('applicantName', formData.applicantName);
    data.append('applicantEmail', formData.applicantEmail);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('resume', formData.resume); 
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
        router.push('/job/myapplications')
      } else {
        alert('Error submitting application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Apply for Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="applicantName"
            placeholder="Name"
            onChange={handleChange}
            value={formData.applicantName}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="applicantEmail"
            placeholder="Email"
            onChange={handleChange}
            value={formData.applicantEmail}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="file"
            name="resume"
            placeholder="Resume URL"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            onChange={handleChange}
            value={formData.coverLetter}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
