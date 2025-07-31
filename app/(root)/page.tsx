import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser} from "@/lib/action/auth.action";
import { getInterviewByUserId } from "@/lib/action/interview.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async() => {
  const user = await getCurrentUser()
  const currentInterview = await getInterviewByUserId(user?.id!)
  const hasInterviews = currentInterview?.length!>0
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
      <p className="text-lg">Your Interviews</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 w-full">
  {hasInterviews ? (
    currentInterview?.map((interview) => (

        <InterviewCard
          userId={user?.id}
          interviewId={interview.id}
          role={interview.role}
          type={interview.type}
          techstack={interview.techstack}
          createdAt={interview.createdAt}
        />
    ))
  ) : (
    <p>You haven&apos;t taken any interviews yet</p>
  )}
</div>

    </>
  );
};

export default page;
