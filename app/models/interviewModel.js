import mongoose from "mongoose";
import { boolean, object } from "zod";
const interviewSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  techstack: [{
    type: String,
    required: true,
  }],
  questions: [{
    type: String,
    required: true,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  finalized: {
    type: Boolean,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
export const Interview =
  mongoose.models.interviews || mongoose.model("interviews", interviewSchema);
