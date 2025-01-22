import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: React.ReactNode;
    image?: string; // Added image property to content
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    // Set initial background image
    if (content.length > 0) {
      setBackgroundImage(content[0].image ?? null);
    }
  }, [content]);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
    setBackgroundImage(content[closestBreakpointIndex].image ?? null);
  });

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 no-scrollbar"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-[#244855]"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg text-[#874F41] max-w-sm mt-10"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      <div
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={cn(
          "hidden lg:block rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName,
          "w-[25%] h-[70%]" // Adjust width and height
        )}
      >
      </div>
    </motion.div>
  );
};
