"use client";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const ticketTypes = [
  { id: "visitor-pass", name: "Visitor Pass", price: 0 },
  { id: "conference-pass", name: "Conference Pass", price: 299 },
  { id: "vip-pass", name: "VIP Pass", price: 599 },
  { id: "startup-pass", name: "Startup Pass", price: 149 },
];

const workshops = [
  { id: "global-leaders", name: "Global Leaders Forum (NEW)" },
  { id: "gitex-main", name: "GITEX Main Stage" },
  { id: "ai-robotics", name: "Artificial Intelligence & Robotics" },
  { id: "ai-everything", name: "AI Everything" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "future-health", name: "Future Health (NEW)" },
  { id: "digital-cities", name: "Digital Cities" },
  { id: "edtech", name: "Edtech" },
  { id: "energy-transition", name: "Energy Transition" },
  { id: "intelligent-connectivity", name: "Intelligent Connectivity" },
  { id: "digital-finance", name: "Digital Finance" },
  { id: "future-mobility", name: "Future Mobility" },
];

const solutions = [
  { id: "global-leaders-sol", name: "Global Leaders Forum (NEW)" },
  { id: "gitex-main-sol", name: "GITEX Main Stage" },
  { id: "ai-robotics-sol", name: "Artificial Intelligence & Robotics" },
  { id: "future-health-sol", name: "Future Health (NEW)" },
  { id: "cybersecurity-sol", name: "Cybersecurity" },
  { id: "ai-everything-sol", name: "AI Everything" },
  { id: "digital-cities-sol", name: "Digital Cities" },
  { id: "edtech-sol", name: "Edtech" },
  { id: "energy-transition-sol", name: "Energy Transition" },
  { id: "intelligent-connectivity-sol", name: "Intelligent Connectivity" },
  { id: "digital-finance-sol", name: "Digital Finance" },
  { id: "future-mobility-sol", name: "Future Mobility" },
];

const priceList = [
  { label: "PREMIUM TICKET x 2", value: "EUR 40.19" },
  {
    label: "Student Ticket Access On Day 3 Only ",
    value: "EUR 50 40 SUBJECT TO APPROVAL Incl. 19% ",
  },
];

const promoCodes = {
  GITEX15: {
    discount: 15,
    code: "GITEX15",
    type: "percentage",
    applies: "2 lowest-priced tickets",
  },
  EARLY2024: {
    discount: 20,
    code: "EARLY2024",
    type: "percentage",
    applies: "2 lowest-priced tickets",
  },
  STUDENT50: {
    discount: 50,
    code: "STUDENT50",
    type: "percentage",
    applies: "2 lowest-priced tickets",
  },
  SAVE100: {
    discount: 100,
    code: "SAVE100",
    type: "fixed",
    applies: "Total price",
  },
};

export default function RegistrationSummary({
  formData,
  onNext,
  onPrev,
  onEdit,
  hasPrev = true,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [activePromo, setActivePromo] = useState(null);
  const { selectedCards, totalPrice } = useSelector((state) => state.order);

  // Calculate discounted price based on promo code
  const { discountedTotal, appliedDiscount, discountedItems } = useMemo(() => {
    if (!activePromo) {
      return { discountedTotal: totalPrice, appliedDiscount: 0, discountedItems: [] };
    }

    let discountAmount = 0;
    let affectedItems = [];

    if (activePromo.type === "percentage") {
      if (activePromo.applies === "2 lowest-priced tickets") {
        // Sort cards by price and get the 2 lowest priced
        const sortedCards = [...selectedCards]
          .sort((a, b) => a.price - b.price)
          .filter(card => card.price > 0)
          .slice(0, 2);

        sortedCards.forEach(card => {
          const itemDiscount = (card.price * card.count * activePromo.discount) / 100;
          discountAmount += itemDiscount;
          affectedItems.push({
            name: card.name,
            originalPrice: card.price * card.count,
            discount: itemDiscount
          });
        });
      }
    } else if (activePromo.type === "fixed") {
      // Fixed amount discount on total
      discountAmount = Math.min(activePromo.discount, totalPrice);
      affectedItems.push({
        name: "Total Order",
        originalPrice: totalPrice,
        discount: discountAmount
      });
    }

    return {
      discountedTotal: Math.max(0, totalPrice - discountAmount),
      appliedDiscount: discountAmount,
      discountedItems: affectedItems
    };
  }, [activePromo, selectedCards, totalPrice]);

  const handleApplyPromoCode = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo) {
      setActivePromo(promo);
    } else {
      alert("Invalid promo code");
      setActivePromo(null);
    }
  };
  const handleRemovePromoCode = () => {
    setActivePromo(null);
    setPromoCode("");
  };

  const handleSubmit = () => {
    // Here you would typically submit the data to your backend
    console.log("Submitting registration:", formData);
    onNext();
  };

  return (
    <div className="max-w-[86rem] mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 ">
        <div className=" bg-gradient-to-r from-[#299D3F] to-[#123F22] py-6 px-8 text-white rounded-[10px] flex md:flex-row flex-col md:items-center justify-between">
          <h2 className="md:text-3xl text-[24px] font-bold  mb-2">
            Registration Summary
          </h2>
        </div>

        <div className="">
          {selectedCards.filter(card => card.count > 0 && discountedItems.find(item => item.name === card.name)).map((card) => (
            <div key={card.id}>
              <div className="border-s-3 bg-[#F0FFF0] py-2 px-3 my-6 border-[#26903B] flex items-start justify-between">
                <div className="text-sm font-[500] text-gray-900">
                  {card.name} x {card.count}
                </div>
                <div className="font-[500] text-gray-900">
                  <div className="text-[#898787] text-sm line-through">
                    EUR {(card.price * card.count).toFixed(2)}
                  </div>
                  <div className="text-[#198754] flex items-center gap-1">
                    <span>
                      EUR {((card.price * card.count) - 
                        (discountedItems.find(item => item.name === card.name)?.discount || 0)
                      ).toFixed(2)}
                    </span>
                    <span className="text-white bg-[#26903B] rounded px-[0.3rem] py-[0.1rem] text-[0.7rem] font-bold me-2">
                      -{activePromo.discount}%
                    </span>
                    <span className="text-[#898787] text-xs">
                      INCL. 19% VAT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activePromo && (
            <div className="bg-[#F0FFF0] rounded-lg py-6 px-3 my-6 border border-[#26903B] flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[#26923B] ">
                Have a promo code?
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full px-4 py-1 border text-sm rounded-lg focus:ring-2  border-[#DEE2E630] bg-[#E5E5E5] focus:bg-white`}
                  placeholder="Enter Promo Code"
                />
                <button
                  type="button"
                  onClick={handleApplyPromoCode}
                  className="px-4 py-2 bg-gradient-to-r from-[#9F1413] to-[#000000]  rounded-lg  w-full md:w-auto transition-colors"
                >
                  <div className="font-medium text-white text-sm">APPLY</div>
                </button>
              </div>
              <div className="text-[1rem] text-[#26923B]">
                Promo code "{activePromo.code}" applied successfully! {activePromo.applies === "2 lowest-priced tickets" ? "Applied to 2 lowest-priced tickets!" : "Applied to total price!"}
              </div>
              <div
                className={`w-full border text-sm rounded-lg p-5 border-[#DEE2E630] bg-white flex gap-2 items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-[500] text-gray-900">
                    Promo code applied:{" "}
                    <span className="text-[#198754]">{activePromo.code}</span>
                  </div>
                  <div className="font-[500] text-gray-900">
                    Discount value:{" "}
                    <span className="text-[#198754]">
                      {activePromo.type === "percentage" ? `${activePromo.discount}%` : `EUR ${activePromo.discount}`} (EUR {appliedDiscount.toFixed(2)} incl. VAT)
                    </span>
                  </div>
                  <div className="font-[500] text-gray-900">
                    Applied to:{" "}
                    <span className="text-[#198754]">
                      {activePromo.applies}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRemovePromoCode}
                  className="w-full sm:w-auto px-3 py-[0.3rem] border-2 border-[#C7000C] text-[#C7000C] text-xs font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  REMOVE
                </button>
              </div>
            </div>
          )}
          <div>
            {selectedCards.filter(card => 
              card.count > 0 && 
              (!activePromo || !discountedItems.find(item => item.name === card.name))
            ).map((card) => (
              <div
                className="border-b border-[#EBEBEB] pt-6 pb-1 flex items-center justify-between"
                key={card.id}
              >
                <div className="text-lg font-[500] text-gray-900">
                  {card.name} x {card.count}
                </div>
                <div className="text-lg font-[500] text-gray-900">
                  {card.price > 0 ? `EUR ${(card.price * card.count).toFixed(2)}` : "FREE"}
                </div>
              </div>
            ))}
            {/* {activePromo && (
              <div className="border-b border-[#EBEBEB] pt-6 pb-1 flex items-center justify-between text-[#198754]">
                <div className="text-lg font-[500]">
                  Discount ({activePromo.code})
                </div>
                <div className="text-lg font-[500]">
                  -EUR {appliedDiscount.toFixed(2)}
                </div>
              </div>
            )} */}
          </div>
          {/* Pricing Summary */}
          {!activePromo && (
            <div className="bg-[#F0FFF0] rounded-lg  py-6 px-3 my-6 border border-[#26903B] flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[#26923B] ">
                Have a promo code?
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full px-4 py-1 border text-sm rounded-lg focus:ring-2  border-[#DEE2E630] bg-white`}
                  placeholder="Enter Promo Code"
                />
                <button
                  type="button"
                  onClick={handleApplyPromoCode}
                  className="px-4 py-2 bg-gradient-to-r from-[#9F1413] to-[#000000]  rounded-lg  w-full md:w-auto transition-colors"
                >
                  <div className="font-medium text-white text-sm">APPLY</div>
                </button>
              </div>
            </div>
          )}

          <div className=" pt-6 pb-1 flex items-center justify-end">
            <div className="text-[1.25rem]  text-[#020202] font-bold">
              <span className="text-[1rem]">Total:</span>{" "}
              {activePromo ? (
                <>
                  <span className="line-through text-[#808080]">EUR {totalPrice.toFixed(2)}</span>{" "}
                  <span>EUR {discountedTotal.toFixed(2)}</span>
                </>
              ) : (
                <span>EUR {totalPrice.toFixed(2)}</span>
              )}{" "}
              <span className="text-xs text-[#808080] font-normal">
                {" "}
                Incl. 19% VAT
              </span>
            </div>
          </div>
          {/* Terms and Conditions */}
          <div className=" py-2 md:max-w-[90%]">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="custom-checkbox mt-1"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-sm text-gray-700 leading-6.5"
              >
                I have read and accept the{" "}
                <a
                  href="https://www.gitexafrica.com/terms-and-conditions"
                  target="_blank"
                  className="text-[#C7000C] hover:text-[#c7000dba] underline"
                >
                  terms and conditions
                </a>
                ,{" "}
                <a
                  href="https://www.gitexafrica.com/privacy-policy"
                  target="_blank"
                  className="text-[#C7000C] hover:text-[#c7000dba] underline"
                >
                  Privacy Policy
                </a>
                , and consent that attendees under the age of 21 will not be
                admitted, and admission to the exhibition is restricted to trade
                and business professionals only, and students above 16 and below
                18 can attend only if accompanied by school or faculty member *
              </label>
            </div>
          </div>

          {/* Consent */}
          <div className=" py-2 md:max-w-[90%]">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                className="custom-checkbox mt-1"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-sm text-gray-700 leading-6.5"
              >
                I hereby consent the use of my data by the organiser, exhibitors
                and sponsors of DWTC & KAOUN International to delivering
                services and for marketing purposes. I am aware that I can
                object to the sending of newsletters at any time *
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex justify-center gap-4 mb-10 pt-8 ">
        {hasPrev && (
          <button
            onClick={onPrev}
            className=" font-archivo px-6 py-3 border border-gray-300 text-white rounded-lg bg-gradient-to-r  from-[#5C2F66] to-[#25102C] transition-colors"
          >
            PREVIOUS
          </button>
        )}

        <button
          onClick={handleSubmit}
          className=" font-archivo px-8 py-3 bg-gradient-to-r from-[#27963D] to-[#134323] text-white rounded-lg transition-colors font-medium"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
