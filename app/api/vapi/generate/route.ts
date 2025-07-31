import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import {Interview} from "@/app/models/interviewModel";
import { getRandomInterviewCover } from "@/lib/utils";
import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import { getCurrentUser } from "@/lib/action/auth.action";
interface InterviewRequestBody {
  techstack: string;
  amount: number;
  level: string;
  role: string;
  type: string;
}
connect()
export async function POST(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  try {
    const { techstack, amount, level, role, type } =
      (await request.json() as InterviewRequestBody);
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });
    console.log(userId);
    const interview = new Interview({
      role: role,
      level: level,
      type: type,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: new mongoose.Types.ObjectId(userId),
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    });
    const savedInterview = await interview.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.log("Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
