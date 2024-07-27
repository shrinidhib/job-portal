"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
        

  const addJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs, selectedJob, setSelectedJob, addJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};
export function useJob() {
    const context = useContext(JobContext);
    if (context === undefined) {
      throw new Error('useJob must be used within a JobProvider');
    }
    return context;
  }
