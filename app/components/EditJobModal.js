"use client";
import { useState } from 'react';

const EditJobModal = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: job.title,
    company: job.company,
    description: job.description,
    requirements: job.requirements.join(', '),
    location: job.location,
    salary: job.salary,
    duration: job.duration,
    jobType: job.jobType,
    applications: job.applications,
    shortlistedCandidates: job.shortlistedCandidates,
  });
  console.log(formData)
  console.log(job.applications)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split(',').map(req => req.trim()), // Convert string back to array
        }),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        console.log(updatedJob)
        onUpdate(updatedJob);
      } else {
        alert('Error updating job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements (comma-separated)"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
            >
              Update Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
