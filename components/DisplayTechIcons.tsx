import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const DisplayTechIcons = async ({ techstack }: TechStackProps) => {
  const techIcons = await getTechLogos(techstack);
  return (
    <div className="flex">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
          key={index}
        >
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
