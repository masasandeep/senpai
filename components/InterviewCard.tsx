import { getRandomImage } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import DisplayTechIcons from "./DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/action/interview.action";
import Link from "next/link";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");
  const feedback = await getFeedbackByInterviewId(interviewId!,userId!)
  return (
    <div className="flex-1 sm:basis-1/2 w-full h-[400px]  rounded-2xl p-1 ">
      <div className="relative flex flex-col w-full bg-gray-900 rounded-2xl px-8 py-4 bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33];">
        <div className="absolute top-0 right-0 rounded-bl-2xl bg-gray-700 dark:bg-gray-800 p-2">
          <p className="font-semibold text-sm capitalise">{normalizedType}</p>
        </div>
        <Image
          src={getRandomImage()}
          alt="Interview"
          width={80}
          height={80}
          className="object-cover rounded-2xl"
        />
        <h3 className="capitalise mt-3">{role} interview</h3>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <Image src="/calendar.svg" alt="calender" width={12} height={12} />
            <p className="text-sm">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/star.svg" alt="star" width={12} height={12} />
            <p className="text-sm">
              {
                feedback?.totalScore || "---"
              }/100
            </p>
          </div>
        </div>
        <p className="line-clamp-2 mt-2">
          {
            feedback?.finalAssessment || "You haven't taken this interview yet. Take it now to improve your skills."
          }
          
        </p>
        <div className="flex items-center justify-between p-2">
          <DisplayTechIcons techstack={techstack} />
          <button className="btn-primary rounded-2xl p-2 bg-cyan-400 font-semibold">
            <Link href={
              feedback?`/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
            } 
            > {feedback ? "Check Feedback" : "View Interview"}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
