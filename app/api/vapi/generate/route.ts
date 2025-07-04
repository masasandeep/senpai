import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import {Interview} from "@/app/models/interviewModel";
import { getRandomInterviewCover } from "@/lib/utils";
export async function POST(request: NextRequest) {
  try {
    const { techstack, amount, level, role, userid, type } =
      await request.json();
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
    const interview = new Interview({
      role: role,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    });
    const savedInterview = await interview.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      {
        success: true,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
