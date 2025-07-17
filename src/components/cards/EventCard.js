"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FEATURES = [
  "Access to ConneXions & Investor Lounge",
  "Network Events",
  "All Conference Tracks",
  "All Masterclasses",
  "3 Days Access to the Show",
  "Access to Dubai Internet City Lounge",
];

const EventCard = ({ type = "free", ...props }) => {
  return (
    <div className="w-full">
      {type === "free" ? (
        <FreeEventCard {...props} />
      ) : (
        <PaidEventCard {...props} />
      )}
    </div>
  );
};

const PaidEventCard = ({ colorCodes = ["#7B2FF2", "#F357A8"] }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="relative w-full rounded-[2rem] bg-gradient-to-br from-[#7B2FF2] to-[#F357A8]  shadow-lg h-full flex flex-col">
      <div className="rounded-[2rem] bg-[#231F20] flex-1 flex flex-col">
        {/* Header */}
        {/* <div className="rounded-t-[2rem] px-8 py-6 bg-gradient-to-r from-[#7B2FF2] to-[#F357A8] bg-[url('/images/card_header_pattern.png')] bg-blend-overlay bg-cover bg-center"> */}
        <div
          className={`rounded-t-[2rem] px-8 py-6 bg-[linear-gradient(to_right,${colorCodes.map(
            (code) => `_${code}`
          )}),url('/images/card_header_pattern.png')]  bg-blend-overlay bg-cover bg-center`}
          style={{
            backgroundImage: `linear-gradient(to right, ${colorCodes.join(
              ", "
            )}), url('/images/card_header_pattern.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white text-lg font-bold tracking-wider">
            VISITOR 3 DAY ACCESS TICKET
          </div>
          <div className="text-[#F7E85A] font-semibold text-sm mt-1 cursor-pointer">
            VIEW DETAILS &rarr;
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 px-8 py-6 flex flex-col justify-between">
          <div>
            <div className="text-white text-base mb-4">
              Visitor Passes provide{" "}
              <span className="text-[#3DF57A] font-semibold">
                3 DAYS ACCESS
              </span>{" "}
              to GITEX NIGERIA exhibition and all free conference
            </div>
            <div className="flex items-center gap-4 mt-6">
              <img src="/public/file.svg" alt="GITEX" className="h-8" />
              <img
                src="/public/globe.svg"
                alt="AI Everything"
                className="h-8"
              />
            </div>
          </div>
          <div>
            <div className="pt-[1px] rounded-md bg-gradient-to-r from-white to-black"></div>
            <div className="flex items-center justify-between pt-4 min-h-[52px]">
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-bold">USD</span>
                <div className="text-white text-sm  font-bold relative min-w-[30px]">
                  <span className="opacity-60">43</span>
                  <svg
                    className="absolute left-[-9px] bottom-[-4px]"
                    width="40"
                    height="21"
                    viewBox="0 0 40 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.736195 16.6985C12.0938 6.33797 25.3947 1.69574 39.2413 0.779249L38.7037 2.29426C28.5728 3.89995 19.5663 6.90857 10.7548 13.4696C7.82257 15.6057 5.70945 17.9628 2.97074 20.6559L0.759199 16.6935L0.736195 16.6985Z"
                      fill="#FC0030"
                      fillOpacity="0.75"
                    />
                  </svg>
                </div>
                <span className="bg-black text-white font-bold border-[0.5px] border-[#ffffff70] px-1 rounded ">
                  32.5
                </span>
                <span className="text-white text-xs opacity-90">
                  Incl. 20% VAT
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#18171A] rounded-[4.18px] px-2 border-[1px] border-[#ffffff70]">
                <button
                  onClick={() => setCount(Math.max(0, count - 1))}
                  className="text-white text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="text-black bg-white text-xs h-full py-1 px-[0.7rem]">
                  {count}
                </span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="text-white text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FreeEventCard = ({ colorCodes = ["#7B2FF2", "#F357A8"] }) => {
  const router = useRouter();
  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-[#FF512F] to-[#F09819] shadow-lg w-full   h-full flex flex-col">
      <div className="rounded-[2rem] bg-[#231F20] flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`rounded-t-[2rem] px-8 py-6 bg-[linear-gradient(to_right,${colorCodes.map(
            (code) => `_${code}`
          )}),url('/images/card_header_pattern.png')]  bg-blend-overlay bg-cover bg-center`}
          style={{
            backgroundImage: `linear-gradient(to right, ${colorCodes.join(
              ", "
            )}), url('/images/card_header_pattern.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white text-lg font-bold tracking-wider">
            VISITOR 3 DAY ACCESS TICKET
          </div>
          <div className="text-[#F7E85A] font-semibold text-sm mt-1 cursor-pointer">
            VIEW DETAILS &rarr;
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 px-8 py-6 flex flex-col justify-between">
          <div>
            <div className="text-white text-base mb-4">
              Visitor Passes provide{" "}
              <span className="text-[#3DF57A] font-semibold">
                3 DAYS ACCESS
              </span>{" "}
              to GITEX NIGERIA exhibition and all free conference
            </div>
            <ul className=" mt-4 flex flex-wrap gap-x-2 gap-y-[0.45rem]">
              {FEATURES.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1 text-white text-xs font-[100] border-1 border-[#ffffff20] bg-[#ffffff08] rounded-[10rem] py-[0.4rem] px-[0.5rem]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.97482 0.85376C4.26262 0.85376 0.438232 4.67815 0.438232 9.39035C0.438232 14.1025 4.26262 17.9269 8.97482 17.9269C13.687 17.9269 17.5114 14.1025 17.5114 9.39035C17.5114 4.67815 13.687 0.85376 8.97482 0.85376ZM7.2675 13.6586L3.85287 10.244L5.05653 9.04035L7.2675 11.2428L12.8931 5.61717L14.0968 6.82937L7.2675 13.6586Z"
                      fill="#00C308"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
              {/* <li className="flex items-center gap-2 text-white text-sm">
                <span className="bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold mr-2">
                  ✓
                </span>
                Access to ConneXions & Investor Lounge
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <span className="bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold mr-2">
                  ✓
                </span>
                Network Events{" "}
                <span className="ml-2 bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">
                  ✓
                </span>
                All Conference Tracks
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <span className="bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold mr-2">
                  ✓
                </span>
                All Masterclasses{" "}
                <span className="ml-2 bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">
                  ✓
                </span>
                3 Days Access to the Show
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <span className="bg-[#3DF57A] rounded-full w-5 h-5 flex items-center justify-center text-black font-bold mr-2">
                  ✓
                </span>
                Access to Dubai Internet City Lounge
              </li> */}
            </ul>
          </div>
          <div>
            <div className="pt-[1px] rounded-md bg-gradient-to-r from-white to-black"></div>
            <div className="flex items-end justify-between min-h-[52px] pt-3">
              <div className="flex flex-col items-start">
                <span className="text-white font-bold">FREE</span>
                <span className="text-white text-xs opacity-60">
                  INCL. 19% VAT
                </span>
              </div>
              <button
                onClick={() => router.push("/registration")}
                className="bg-white text-black text-sm font-bold px-5 py-2 rounded-lg shadow cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
