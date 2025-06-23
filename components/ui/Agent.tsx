import Image from "next/image";

const Agent = () => {
  const isSpeaking = true; 

  return (
    <div className="flex sm:flex-row flex-col items-center justify-between gap-6">
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
        <h3 className="font-semibold text-center">AI Interviewer</h3>
      </div>
    </div>
  );
};

export default Agent;
