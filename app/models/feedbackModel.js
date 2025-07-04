import mongoose from "mongoose";

const categoryScoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural & Role Fit",
        "Confidence & Clarity",
      ],
    },
    score: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);


const feedbackSchema = new mongoose.Schema({
  interviewId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  categoryScores: {
    type: [categoryScoreSchema],
    validate: [
      (val) => val.length === 5,
      "Exactly 5 category scores are required.",
    ],
  },
  strengths: {
    type: [String],
    required: true,
  },
  areasForImprovement: {
    type: [String],
    required: true,
  },
  finalAssessment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Feedback =mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
