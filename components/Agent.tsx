"use client";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/action/interview.action";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vpai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = ({
  username,
  userId,
  type,
  questions,
  feedbackId,
  interviewId,
}: AgentProps) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [lastMessage, setLastMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };
    const onSpeechStart = () => {
      setIsSpeaking(true);
    };
    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };
    const onError = (error: Error) => {
      console.log("Error:", error);
    };
    const onMessages = (messages: any) => {
      if (messages.type == "transcript" && messages.transcriptType == "final") {
        const newMessage: Messages = {
          role: messages.role,
          content: messages.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessages);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessages);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
    const handleGenerateFeedback = async (messages: Messages[]) => {
      const { success, id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });
      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, router]);
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    if (type === "generate") {
      try {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
         variableValues:{
          "username": username,
          "userid": userId
         }
        });
      } catch (error) {
        console.error("Error starting Vapi workflow:", error);
      }
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };
  return (
    <>
      <div className="flex sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col rounded-lg p-7 h-[400px] sm:basis-1/2 items-center gap-2 justify-center flex-1 border-2 border-solid bg-gradient-to-b from-[#171532] to-[#08090D] w-full">
          <div className="relative size-[120px] rounded-full bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] flex items-center justify-center p-2 z-10 overflow-hidden">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer Avatar"
              width={65}
              height={54}
              className="object-cover z-10"
            />
          </div>
          <h3 className="font-semibold text-center">AI Interviewer</h3>
        </div>
        <div className="flex flex-col rounded-lg p-7 h-[400px] sm:basis-1/2 items-center gap-2 justify-center flex-1 border-2 border-solid bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] w-full max-md:hidden">
          <div className="relative size-[120px] rounded-full bg-gradient-to-b from-[#1A1C20] to-[#08090D] flex items-center justify-center p-2 z-10 overflow-hidden">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer Avatar"
              width={65}
              height={54}
              className="object-cover z-10"
            />
          </div>
          <h3 className="font-semibold text-center">username</h3>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="w-full justify-center flex items-center p-2 h-6 rounded-lg px-4 py-3 bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]">
          <p
            key={lastMessage}
            className={cn(
              "transition-opacity duration-500 opacity-0",
              "animate-fadeIn opacity-100"
            )}
          >
            {lastMessage}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <button
          aria-label={callStatus === "ACTIVE" ? "End Call" : "Start Call"}
          className="p-2 w-20 rounded-lg bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] cursor-pointer"
          onClick={callStatus === "ACTIVE" ? handleDisconnect : handleCall}
        >
          <span className="font-semibold">
            {callStatus === "ACTIVE"
              ? "End"
              : callStatus === "CONNECTING"
              ? "..."
              : "Call"}
          </span>
        </button>
      </div>
    </>
  );
};

export default Agent;
