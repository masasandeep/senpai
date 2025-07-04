"use server";
import { Interview } from "@/app/models/interviewModel";
import { feedbackSchema } from "@/constants";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { Feedback } from "@/app/models/feedbackModel";

export const getInteriewById = async (id: string) => {
  try {
    const resp = await Interview.findById({ id });
    if (!resp) return null;
    return { ...resp } as InterView;
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
    const parsedData = feedbackSchema.parse(object);
    const newFeedback = new Feedback({
      interviewId: interviewId,
      userId: userId,
      categoryScores: parsedData.categoryScores,
      totalScores: parsedData.totalScore,
      strengths: parsedData.strengths,
      areasForImprovement: parsedData.areasForImprovement,
      finalAssessment: parsedData.finalAssessment,
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
        id: newFeedback._id,
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
    const feedback = await Feedback.findById({
      $all: [interviewId, userId],
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
