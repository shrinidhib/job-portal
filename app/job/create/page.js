"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

  const [requirementsArray, setRequirementsArray] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleRequirementsChange = (e) => {
    setJobData({ ...jobData, requirements: e.target.value });
  };

  const addRequirement = () => {
    if (jobData.requirements.trim() !== '') {
      setRequirementsArray([...requirementsArray, jobData.requirements]);
      setJobData({ ...jobData, requirements: '' });
    }
  };

  const generateDescription = async () => {
    if (!jobData.title || !requirementsArray || !jobData.company) {
      alert('Please set title, requirements, and company name first!');
      return;
    }

    setIsGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const input = `Generate a job description for a ${jobData.title} at ${jobData.company}. Make it short (200 words only)`;
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setJobData({ ...jobData, description: text });
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const jobPayload = {
      ...jobData,
      requirements: requirementsArray
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobPayload),
      });
      const result = await response.json();
      
      router.push('/');
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="p-6 max-w-[60%] mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
            className="mt-1 block h-80 resize-none w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={generateDescription}
            className={`mt-2 px-4 py-2 rounded-lg ${isGenerating ? 'bg-gray-500' : 'bg-green-500'} text-white hover:bg-green-600`}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Description'}
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Requirements</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="requirements"
              value={jobData.requirements}
              onChange={handleRequirementsChange}
              placeholder="Enter a requirement"
              className="mt-1 block flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {requirementsArray.map((req, index) => (
              <li key={index} className="bg-gray-100 px-3 py-1 rounded-lg">{req}</li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
