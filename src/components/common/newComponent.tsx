"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewComponent() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageDivRef.current) return;

    gsap.fromTo(
      imageDivRef.current,
      { yPercent: 10 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, 
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center gap-[10vh]"
    >
      
      <div className="flex flex-col justify-center gap-10 w-[40vw] h-[80vh]">
        <h1 className="font-bold text-[#f9a71f] text-6xl">
          World <br /> Drivers'
        </h1>

        <h1 className="text-[#f9a71f] text-6xl -translate-y-10 font-serif">
          Champion
        </h1>

        <p className="text-[#f9a71f] text-2xl">
          Celebrate this incredible moment with a collection designed for the
          fans who never stopped believing. Wear it, frame it, treasure it
          forever.
        </p>

        <button className="text-[#000000] text-1xl border-4 border-[#f9a71f] bg-[#f9a71f] w-fit">
          Visit the Store
        </button>
      </div>

      {/* Images */}
      <div
        ref={imageDivRef}
        className="relative w-[40vw] h-[80vh] will-change-transform"
      >
        <img
          src="/images/events/2.png"
          alt="cover"
          className="h-full object-cover translate-x-20"
        />

        <img
          src="/images/team/pic3.svg"
          alt="cover"
          className="top-[20vh] right-[2vh] absolute h-[30%] object-cover translate-x-20"
        />

        <img
          src="/images/team/pic4.svg"
          alt="cover"
          className="-bottom-[8vh] -left-20 absolute h-[30%] object-cover translate-x-20"
        />
      </div>
    </div>
  );
}
