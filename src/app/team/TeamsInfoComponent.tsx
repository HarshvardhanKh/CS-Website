"use client";

import CountUp from "@/src/app/team/CountUp";

export default function TeamsInfoComponent() {
  return (
    <div className="relative h-screen flex items-center justify-center gap-[0vh]">
      <div className="flex flex-col items-start  gap-10 w-[40vw] h-[80vh]">
        <h1 className="font-bold text-[#f9a71f] text-6xl">
          IEEE CS MUJ
        </h1>

        <h1 className="text-[#f9a71f] text-6xl -translate-y-10">
          Since 2019
        </h1>
        <img 
        className="h-[50vh] object-contain"
        src="/images/events/2.png" 
        alt="img" />
      </div>

      <div className="relative w-[50vw] h-[80vh] ">
        <div className="w-full h-full grid grid-cols-2 grid-rows-2">
          <div className="">
            <p
            className="uppercase text-[10px] font-bold translate-y-[15px]">
              Members
            </p>
            <CountUp
              from={0}
              to={1500}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-[90px] font-bold inline-block scale-y-120"
              startWhen={true}
            /> 
            <h1
            className="inline-block text-[90px]"
            >+</h1>
          </div>
          <div className=" ">
            <p
            className="uppercase text-[10px] font-bold translate-y-[15px]">
              Events
            </p>
            <CountUp
              from={0}
              to={20}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-[90px] font-bold inline-block scale-y-120"
              startWhen={true}
            />
            <h1
            className="inline-block text-[90px]"
            >+</h1>
          </div>
          <div className="">
            <p
            className="uppercase text-[10px] font-bold translate-y-[15px]">
              Societies
            </p>
            <CountUp
              from={0}
              to={3}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-[90px] font-bold inline-block scale-y-120"
              startWhen={true}
            />
            <h1
            className="inline-block text-[90px]"
            >+</h1>
          </div>
          <div className="">
            <p
            className="uppercase text-[10px] font-bold translate-y-[15px]">
              Mentors
            </p>
            <CountUp
              from={0}
              to={10}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-[90px] font-bold inline-block scale-y-120"
              startWhen={true}
            />
            <h1
            className="inline-block text-[90px]"
            >+</h1>
          </div>
        </div>
        
      </div>
    </div>
  );
}