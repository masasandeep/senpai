import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex blue-gradient-dark px-4 py-6 rounded-3xl items-center justify-between">
        <div className="flex max-w-lg gap-4 flex-col">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </div>
      <p className="text-lg">Your Past Interviews</p>
      <div className="flex gap-6 px-2">
        {dummyInterviews.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))}
      </div>
    </>
  );
};

export default page;
