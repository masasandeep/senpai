"use server";
import { Interview } from "@/app/models/interviewModel";
import { feedbackSchema } from "@/constants";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { Feedback } from "@/app/models/feedbackModel";
import { connect } from "@/dbConfig/dbConfig";
connect()
export const getInteriewById = async (id: string):Promise<InterView|null> => {
  try {
    const resp = await Interview.findById(id );
    if (!resp) return null;
    const interviewData = { 
      id: resp._id.toString(),
      questions: resp.questions,
      techstack: resp.techstack,
      userId: resp.userId,
      type: resp.role,
      finalized: resp.finalized,
  role: resp.role,
  level: resp.level
  
     } 
    return interviewData
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const createFeedback = async (params: CreateFeedback) => {
  const { interviewId, feedbackId, transcript, userId } = params;
  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });
    const newFeedback = new Feedback({
      interviewId: interviewId,
      userId: userId,
      categoryScores: object.categoryScores,
      totalScore: object.totalScore,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    });
    if (feedbackId) {
      const saveFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        newFeedback,
        {
          new: true,
          runValidators: true,
        }
      );
      await saveFeedback!.save();
      return {
        success: true,
        id: feedbackId,
      };
    } else {
      await newFeedback!.save();
      return {
        sucess: true,
        id: newFeedback._id.toString(),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
export const getFeedbackByInterviewId = async (
  interviewId: string,
  userId: string
):Promise<FeedbackStructure|null> => {
  try {
    const feedback = await Feedback.findOne({
      interviewId, userId
    });
    if (!feedback) return null;
    return {
      id: feedback._id.toString(),
      interviewId: feedback.interviewId,
      userId: feedback.userId,
      categoryScores: feedback.categoryScores,
      totalScore: feedback.totalScore,
      strengths: feedback.strengths,
      areasForImprovement: feedback.areasForImprovement,
      finalAssessment: feedback.finalAssessment,
      createdAt: feedback.createdAt instanceof Date ? feedback.createdAt.toISOString() : feedback.createdAt,
    } as FeedbackStructure;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getInterviewByUserId  =async(id:string):Promise<InterView[]|null>=>{
  try{
    const interviews = await Interview.find({userId: id})
    if(!interviews||interviews.length ==0) return null
    const interviewsData = interviews.map((doc)=>({
      id: doc._id.toString(),
      role: doc.role,
    level: doc.level,
    questions: doc.questions,
    techstack: doc.techstack,
    createdAt: doc.createdAt.toISOString(),
    userId: doc.userId.toString(),
    type: doc.type,
    finalized: doc.finalized,
    }))
    return interviewsData
  }catch(err:any){
    console.log(err)
    return null
  }
}
