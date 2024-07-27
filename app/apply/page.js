"use client"
import React from 'react';

const ApplyPage = () => {
  return (
    <div>
      <h1>Apply for the Job</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" required />
        </label>
        <label>
          Resume:
          <input type="file" name="resume" required />
        </label>
        <label>
          Cover Letter:
          <textarea name="coverLetter" required></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyPage;
