
import HeaderImg from "@/../../public/images/header_bg.png";
import Image from "next/image";
import EventCard from "./cards/EventCard";

const events = [
  {
    id: '1',
    type:"paid",
    colorCodes:["#5B2A7C","#451D5D"]
  },
  {
    id: '2',
    type:"free",
    colorCodes:["#CD670A","#CA3722"]
  },
  {
    id: '3',
    type:"free",
    colorCodes:["#173903","#081D01"],
    tag:"EXCLUSIVE"
  },
  {
    id: '4',
    type:"free",
    colorCodes:["#B5040A","#631308"],
    tag:"BEST SELLER"
  },
  {
    id: '5',
    type:"free",
    colorCodes:["#53BE2C","#27870C"]
  },
  {
    id: '6',
    type:"free",
    colorCodes:["#004D98","#01277C"]
  }
];
export default function CardList() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  ">
        <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
      </div>

      {/* Main Content */}
      <div className=" mx-auto pt-[70px] pb-[133px]">
        
    <div className="max-w-[86rem] mx-auto">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center mx-auto">
        {events.map((event) => (
          <EventCard {...event} key={event.id} />
        ))}
      </div>
    </div>
      </div>

      <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  ">
        <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
      </div>
      <div className="bg-gradient-to-r from-[#299D3F] to-[#123F22] w-full min-h-30 sticky bottom-0"></div>
    </div>
  );
}
