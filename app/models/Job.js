import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true, 
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true, 
  },
  duration:{
    type : String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time'],
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;
