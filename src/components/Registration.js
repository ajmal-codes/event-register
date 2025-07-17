"use client";

import { useState } from "react";
import RegistrationForm from "./steps/RegistrationForm";
import RegistrationSummary from "./steps/RegistrationSummary";
import ThankYou from "./steps/ThankYou";
import SolutionsModal from "./modals/SolutionsModal";
import Image from "next/image";
import HeaderImg from "@/../../public/images/header_bg.png";

const STEPS = {
  REGISTRATION_FORM: "registration_form",
  REGISTRATION_FORM2: "registration_form1",
  REGISTRATION_FORM3: "registration_form2",
  REGISTRATION_SUMMARY: "registration_summary",
  THANK_YOU: "thank_you",
};

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(STEPS.REGISTRATION_FORM);
  const [showSolutionsModal, setShowSolutionsModal] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      country: "",
      city: "",
      industry: "",
      companySize: "",
      website: "",
      linkedin: "",
    },
    selectedWorkshops: [],
    selectedSolutions: [],
    selectedSubSolutions: [],
    selectedTickets: [],
    promoCode: "",
    totalAmount: 0,
    discount: 0,
  });

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const updateArrayData = (key, data) => {
    setFormData((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const nextStep = () => {
    const stepOrder = Object.values(STEPS);
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder = Object.values(STEPS);
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const getStepNumber = () => {
    const stepOrder = Object.values(STEPS);
    return stepOrder.indexOf(currentStep) + 1;
  };

  const getTotalSteps = () => {
    return Object.values(STEPS).length - 1;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.REGISTRATION_FORM:
        return (
          <RegistrationForm
            hasPrev={getStepNumber() > 1}
            formData={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
            onNext={nextStep}
            onPrev={prevStep}
            onShowSolutions={() => setShowSolutionsModal(true)}
            selectedWorkshops={formData.selectedWorkshops}
            selectedSolutions={formData.selectedSolutions}
            selectedSubSolutions={formData.selectedSubSolutions}
          />
        );
      case STEPS.REGISTRATION_FORM2:
        return (
          <RegistrationForm
            formData={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
            onNext={nextStep}
            onPrev={prevStep}
            onShowSolutions={() => setShowSolutionsModal(true)}
            selectedWorkshops={formData.selectedWorkshops}
            selectedSolutions={formData.selectedSolutions}
            selectedSubSolutions={formData.selectedSubSolutions}
          />
        );
      case STEPS.REGISTRATION_FORM3:
        return (
          <RegistrationForm
            formData={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
            onNext={nextStep}
            onPrev={prevStep}
            onShowSolutions={() => setShowSolutionsModal(true)}
            selectedWorkshops={formData.selectedWorkshops}
            selectedSolutions={formData.selectedSolutions}
            selectedSubSolutions={formData.selectedSubSolutions}
          />
        );
      case STEPS.REGISTRATION_SUMMARY:
        return (
          <RegistrationSummary
            formData={formData}
            onNext={nextStep}
            onPrev={prevStep}
            onEdit={goToStep}
          />
        );
      case STEPS.THANK_YOU:
        return <ThankYou formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  ">
        <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
      </div>
      <div className="w-full bg-[url('/images/registration_bg.png')]">
        {/* Progress Bar */}
        {currentStep !== STEPS.THANK_YOU && (
          <div className=" flex max-w-[34rem] mx-auto items-center pt-8 pb-7">
            {Object.keys(STEPS)
              .filter((step) => step !== "THANK_YOU")
              .map((step, index, arr) => {
                const stepNumber = index + 1;
                const currentNumber = getStepNumber(); // assuming this returns number
                let fill = 0;

                if (stepNumber < currentNumber) fill = 100;
                else if (stepNumber === currentNumber) fill = 50;

                const isLastItem = index === arr.length - 1;
                return (
                  <div
                    key={step}
                    className={`px-4 flex items-center gap-3 ${
                      isLastItem ? "flex-shrink-0" : "flex-1"
                    }`}
                  >
                    <div
                      className={`${
                        fill > 0
                          ? "bg-green-600 text-white"
                          : " border-1 border-[#00000022] text-[#2F2F2F50]"
                      } rounded-full transition-all duration-300 aspect-square h-8 flex items-center justify-center text-lg`}
                    >
                      {fill == 100 ? (
                        <svg
                          width="15"
                          height="10"
                          viewBox="0 0 15 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 1.18292C15.0004 1.3383 14.968 1.49223 14.9047 1.63579C14.8413 1.77935 14.7482 1.90969 14.6308 2.01927L6.68142 9.47764C6.32384 9.81215 5.83948 10 5.33452 10C4.82957 10 4.34521 9.81215 3.98763 9.47764L0.37241 6.0857C0.254662 5.976 0.161154 5.84558 0.0972478 5.7019C0.0333415 5.55823 0.000294473 5.40413 1.95904e-06 5.24844C-0.000290554 5.09276 0.0321772 4.93855 0.0955432 4.79466C0.158909 4.65078 0.251927 4.52004 0.369261 4.40996C0.486596 4.29987 0.625939 4.2126 0.7793 4.15315C0.93266 4.0937 1.09702 4.06324 1.26296 4.06352C1.42889 4.0638 1.59313 4.0948 1.74627 4.15477C1.8994 4.21473 2.03841 4.30246 2.15533 4.41294L5.33452 7.39578L12.848 0.34648C13.0243 0.181042 13.2489 0.0683758 13.4934 0.0227308C13.738 -0.0229141 13.9915 0.000512727 14.2219 0.0900483C14.4522 0.179584 14.6491 0.331206 14.7876 0.525737C14.9261 0.720269 15 0.94897 15 1.18292Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index != arr.length - 1 && (
                      <div className="w-full bg-gray-200 rounded-full h-[0.4rem]">
                        <div
                          className="bg-green-600 h-[0.4rem] rounded-full transition-all duration-300"
                          style={{
                            width: `${fill}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-[86rem] mx-auto ">{renderCurrentStep()}</div>

        {/* Modals */}

        {showSolutionsModal && (
          <SolutionsModal
            selectedSolutions={formData.selectedSolutions}
            selectedSubSolutions={formData.selectedSubSolutions}
            onUpdate={(solutions, subSolutions) => {
              updateArrayData("selectedSolutions", solutions);
              subSolutions &&
                updateArrayData("selectedSubSolutions", subSolutions);
            }}
            onClose={() => setShowSolutionsModal(false)}
          />
        )}

        <div className="bg-white bg-[top_center] bg-contain bg-no-repeat  ">
          <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
