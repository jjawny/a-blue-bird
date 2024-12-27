import { useCallback, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Typewriter, { Options } from "typewriter-effect";
import { cn } from "~/shared/helpers/classname-helpers";

export default function Hero() {
  return (
    <Tilt tiltReverse={true} tiltEnable={true} reset={true} transitionSpeed={10000} perspective={600}>
      <span className="chat-container font-syne select-none">
        <HeroChatBubble />
        <GreetingChatBubble />
      </span>
    </Tilt>
  );
}

const HeroChatBubble = () => {
  const [dotsIndex, setDotsIndex] = useState<number>(0);
  const dots: string[] = ["", ".", "..", "..."];
  const typewriterOptions: Partial<Options> = {
    strings: ["Blue<br>Bird"],
    autoStart: true,
    loop: true,
    cursor: "",
  };
  useEffect(function cycleDotsIndex() {
    const interval = setInterval(() => setDotsIndex((i) => (i + 1) % dots.length), 250);
    return () => clearInterval(interval);
    // Run once on mount (no deps needed)
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="text-nowrap pl-4 text-start text-[1.5vw] font-bold text-gray-300 sm:text-xs">
        Johnny is typing {dots[dotsIndex]}
      </div>
      <div
        className={cn(
          "chat-bubble from-them",
          "bg-stone-900 shadow-lg shadow-pink-300",
          "text-start font-extrabold tracking-tight",
          "h-[20vw] min-h-fit min-w-[35vw] text-[7vw]",
        )}
      >
        <Typewriter options={typewriterOptions} />
      </div>
    </div>
  );
};

const GreetingChatBubble = () => {
  const [greeting, setGreeting] = useState<string>("hi");
  const greetings: string[] = [
    "hola",
    "salut",
    "ní hǎo",
    "ciao",
    "konnichiwa",
    "chào",
    "annyeong",
    "namaste",
    "apa kabar",
    "khob chai",
  ];

  const randomGreeting = useCallback(() => {
    const index = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[index] ?? "hi");
  }, [greetings]);

  useEffect(
    function waitForNextGreeting() {
      const intervalID = setInterval(randomGreeting, 300);

      return () => clearInterval(intervalID);
    },
    [randomGreeting],
  );

  return (
    <div className="flex items-end justify-end gap-2">
      <div
        className={cn(
          "chat-bubble from-me",
          "shadow-lg shadow-cyan-100",
          "mb-[1vw] flex justify-end whitespace-nowrap",
          "min-h-fit min-w-[13vw] text-[1vw]",
        )}
      >
        {greeting} 👋🏻
      </div>
      <img src="/images/bird.png" className="h-[2vw] scale-x-[-1] transform" />
    </div>
  );
};
