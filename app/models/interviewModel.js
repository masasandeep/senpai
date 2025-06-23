import mongoose from "mongoose"
const interviewSchema  = new mongoose.Schema({
    role: String,
    type: String,
    level: String,
    techstack: [String],
    questions: [String],
    userId: String,
    coverImage: String,
    createdAt: Date
})
const Interview = mongoose.models.interviews || mongoose.model("interviews",interviewSchema)
export default Interview