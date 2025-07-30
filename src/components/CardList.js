"use client";
import HeaderImg from "@/../../public/images/header_bg.png";
import Image from "next/image";
import EventCard from "./cards/EventCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import SummaryModal from "./modals/SummaryModal";

const events = [
  {
    id: "1",
    name:"GITEX NIGERIA exhibition",
    type: "paid",
    colorCodes: ["#5B2A7C", "#451D5D"],
    oldPrice:43,
    price:32.5,
  },
  {
    id: "2",
    name:"GITEX NIGERIA exhibition2",
    type: "free",
    colorCodes: ["#CD670A", "#CA3722"],
  },
  {
    id: "3",
    name:"GITEX NIGERIA exhibition3",
    type: "free",
    colorCodes: ["#173903", "#081D01"],
    tag: "EXCLUSIVE",
  },
  {
    id: "4",
    name:"GITEX NIGERIA exhibition4",
    type: "free",
    colorCodes: ["#B5040A", "#631308"],
    tag: "BEST SELLER",
  },
  {
    id: "5",
    name:"GITEX NIGERIA exhibition6",
    type: "free",
    colorCodes: ["#53BE2C", "#27870C"],
  },
  {
    id: "6",
    name:"GITEX NIGERIA exhibition6",
    type: "free",
    colorCodes: ["#004D98", "#01277C"],
  },
];
export default function CardList() {
  const { totalPrice, selectedCards,totalCount } = useSelector((state) => state.order);
  const [showSummary,setShowSummary]=useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  ">
        <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
      </div>

      {/* Main Content */}
      <div className=" mx-auto pt-[70px] pb-[133px]">
        <div className="max-w-[86rem] mx-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center mx-auto px-5 xl:px-0">
            {events.map((event) => (
              <EventCard {...event} key={event.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  relative">
        <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
      </div>
      <div className="bg-gradient-to-r from-[#299D3F] to-[#123F22] w-full md:min-h-30 sticky bottom-0">
        <div className="max-w-[86rem] mx-auto flex md:justify-end justify-center">
          <div className="flex flex-col md:flex-row justify-between md:gap-18 gap-6 md:items-center py-4 font-alexandria">
            <div className="flex flex-col text-white">
              <div className="  text-white font-bold">
                <span className="text-2xl font-normal">Total: </span>{" "}
                <span className="text-[2.1rem]">EUR {totalPrice.toFixed(2)}</span>{" "}
                <span className="text-2xl font-normal"> Incl. 19% VAT</span>
              </div>
              <div className="cursor-pointer " onClick={()=>setShowSummary(true)}>View Ticket summary ({totalCount} items)</div>
            </div>
            <Link
              className="bg-white text-[#125113] text-lg font-bold px-7 py-3 text-center rounded-xl shadow cursor-pointer"
              href="/registration"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
              {showSummary && (
                <SummaryModal
                  onClose={() => setShowSummary(false)}
                />
              )}
    </div>
  );
}
