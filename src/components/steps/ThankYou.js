"use client";

import { useRouter } from "next/navigation";

export default function ThankYou({ formData }) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto text-center py-[9rem] px-4">
      <div className="bg-[#258B39] rounded-[1rem] shadow-lg pt-2 md:pt-2">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Success Icon */}
          <div className="mb-8 font-alexandria text-[#000000] flex flex-col gap-6 md:max-w-[80%] m-auto">
            <h1 className="text-3xl font-bold uppercase">
              THANK YOU!
            </h1>
            <p className="text-2xl font-light capitalize">
              Your Registration Has Been Submitted Successfully
            </p>
            <p className="text-xl font-light capitalize">
              A confirmation email with your event details will be sent to you
              shortly. Please check your inbox (and spam folder).{" "}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer font-archivo px-8 py-3 bg-gradient-to-r from-[#27963D] to-[#134323] text-white rounded-lg transition-colors font-medium"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
