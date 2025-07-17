"use client";

import { useState } from "react";
import IdCardHeader from "@/../../public/images/id_card_header.png";
import Image from "next/image";
import { solutionList, subOptionsList } from "../modals/SolutionsModal";

const countries = [
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "Australia",
  "Canada",
  "Singapore",
  "Saudi Arabia",
  "Egypt",
  "South Africa",
  "Brazil",
  "Mexico",
  "Russia",
  "Italy",
  "Spain",
  "Netherlands",
];
const countryCodes = [
  { name: "United Arab Emirates", code: "+971", flag: "" },
  { name: "United States", code: "+1", flag: "" },
  { name: "United Kingdom", code: "+44", flag: "" },
  { name: "Germany", code: "+49", flag: "" },
  { name: "France", code: "+33", flag: "" },
  { name: "India", code: "+91", flag: "" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Telecommunications",
  "Energy",
  "Transportation",
  "Real Estate",
  "Media",
  "Government",
  "Non-profit",
  "Consulting",
  "Other",
];

const companyTypes = [
  "Startup",
  "Enterprise",
  "Government",
  "Academic",
  "Non-profit",
  "Individual",
];

const workshops = [
  {
    id: "global-leaders",
    name: "Global Leaders Forum !NEW",
    duration: "5 Days",
    category: "leadership",
  },
  {
    id: "gitex-main",
    name: "GITEX Main Stage",
    duration: "4 Days",
    category: "main",
  },
  {
    id: "ai-robotics",
    name: "Artificial Intelligence & Robotics",
    duration: "15",
    category: "technology",
  },
  {
    id: "ai-everything",
    name: "AI Everything",
    duration: "4 Days",
    category: "technology",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    duration: "4 Days",
    category: "security",
  },
  {
    id: "future-health",
    name: "Future Health (NEW)",
    duration: "2 Days",
    category: "health",
  },
  {
    id: "digital-cities",
    name: "Digital Cities",
    duration: "1 Day",
    category: "smart-city",
  },
  { id: "edtech", name: "Edtech", duration: "1 Day", category: "education" },
  {
    id: "energy-transition",
    name: "Energy Transition",
    duration: "1 Day",
    category: "energy",
  },
  {
    id: "intelligent-connectivity",
    name: "Intelligent Connectivity",
    duration: "1 Day",
    category: "connectivity",
  },
  {
    id: "digital-finance",
    name: "Digital Finance",
    duration: "1 Day",
    category: "finance",
  },
  {
    id: "future-mobility",
    name: "Future Mobility",
    duration: "1 Day",
    category: "mobility",
  },
];
export default function RegistrationForm({
  formData,
  onUpdate,
  onNext,
  onPrev,
  onShowSolutions,
  selectedWorkshops,
  selectedSolutions = [],
  selectedSubSolutions = [],
  hasPrev = true,
}) {
  const [errors, setErrors] = useState({});
  const [localSelected, setLocalSelected] = useState(selectedWorkshops);

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!formData.company?.trim()) newErrors.company = "Company is required";
    if (!formData.jobTitle?.trim())
      newErrors.jobTitle = "Job title is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.companyType)
      newErrors.companyType = "Company type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
    onNext();
    // }
  };
  const fullName =
    formData.firstName || formData.lastName
      ? `${formData.firstName} ${formData.lastName}`
      : null;

  const leftColumn = workshops.slice(0, Math.ceil(workshops.length / 2));
  const rightColumn = workshops.slice(Math.ceil(workshops.length / 2));

  const handleToggleWorkshop = (workshopId) => {
    setLocalSelected((prev) => {
      if (prev.includes(workshopId)) {
        return prev.filter((id) => id !== workshopId);
      } else {
        if (prev.length >= 5) {
          alert("You can select maximum 5 workshops");
          return prev;
        }
        return [...prev, workshopId];
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className=" mx-auto">
      <div className="flex flex-col md:flex-row gap-4 px-4 border-1 rounded border-[#579B29]  bg-white p-4">
        <div className="bg-white w-full  md:min-w-[60rem]">
          <div className=" bg-gradient-to-r from-[#299D3F] to-[#123F22] py-6 px-8 text-white rounded-t-[10px] flex md:flex-row flex-col md:items-center justify-between">
            <h2 className="md:text-3xl text-[24px] font-bold  mb-2">
              Registration Information
            </h2>
            <p className="border-2 border-[#ffffff28] py-2 md:text-lg text-sm px-5 rounded-[10px] bg-[#ffffff08]">
              PREMIUM TICKET - FREEIncl. 19% VAT
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-[10px] shadow-[0_0_15px_-6px_#ACACAC]">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country of residence*
                </label>
                <select
                  value={formData.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Please Select</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select
                  value={formData.country || ""}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Please Select</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <select
                  value={formData.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Please Select</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="flex gap-2">
                  <select
                    // value={formData.phoneCode || ""}
                    // onChange={(e) =>
                    //   handleInputChange("phoneCode", e.target.value)
                    // }
                    className={`max-w-[6rem] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.phoneCode ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {/* <option value="">Please Select</option> */}
                    {countryCodes.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.flag && (
                          <Image
                            src={code.flag}
                            alt={code.name}
                            width={20}
                            height={20}
                          />
                        )}
                        {code.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle || ""}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.jobTitle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your job title"
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type *
                </label>
                <select
                  value={formData.companyType || ""}
                  onChange={(e) =>
                    handleInputChange("companyType", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.companyType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select company type</option>
                  {companyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.companyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry || ""}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.industry ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                )}
              </div>
            </div>

            <div className="pt-6 gap-4 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm">
                What products & services are you interested in? *
              </div>

              <button
                type="button"
                onClick={onShowSolutions}
                className="px-4 py-2 bg-gradient-to-r from-[#FF0000] to-[#000000]  rounded-lg  w-full md:w-auto transition-colors"
              >
                <div className="font-medium text-white text-sm">
                  SELECT <span className="font-bold">SOLUTIONS/PRODUCTS</span>
                </div>
              </button>
            </div>

            {selectedSolutions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Categories
                </label>
                <div className="flex gap-3">
                  {selectedSolutions?.map((category) => (
                    <div key={category} className=" bg-[#5E3169] text-white rounded-[10rem] px-4 py-1">
                        {solutionList.find((item) => item.id == category).name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSubSolutions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Categories
                </label>
                <div className="flex gap-3">
                {selectedSubSolutions?.map((category) => (
                    <div key={category} className=" bg-[#F5F5F5] border-2 border-[#D0D0D0] text-[#616161] rounded-[10rem] px-4 py-1">
                      {subOptionsList.find((item) => item.id == category).name}
                  </div>
                ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Workshop{" "}
                <span className="text-[#6F6969]">(Maximum 6 can Select)</span>
              </label>{" "}
              {/* Workshop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-6 max-h-80 md:max-h-96 overflow-y-auto">
                {/* Left Column */}
                <div className="">
                  {leftColumn.map((workshop) => (
                    <label
                      key={workshop.id}
                      className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={localSelected.includes(workshop.id)}
                        onChange={() => handleToggleWorkshop(workshop.id)}
                        className="custom-checkbox"
                      />
                      <div className="flex items-center text-sm">
                        <div className=" text-gray-900">
                          {workshop.name}{" "}
                          <span
                            className={
                              workshop.duration.length <= 3
                                ? "text-gray-500"
                                : "text-[#000"
                            }
                          >
                            ({workshop.duration})
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Right Column */}
                <div className="">
                  {rightColumn.map((workshop) => (
                    <label
                      key={workshop.id}
                      className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={localSelected.includes(workshop.id)}
                        onChange={() => handleToggleWorkshop(workshop.id)}
                        className=" custom-checkbox"
                      />
                      <div className="flex items-center text-sm">
                        <div className=" text-gray-900">
                          {workshop.name}{" "}
                          <span
                            className={
                              workshop.duration.length <= 3
                                ? "text-gray-500"
                                : "text-[#000"
                            }
                          >
                            ({workshop.duration})
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg w-full h-fit overflow-hidden">
          <Image
            src={IdCardHeader}
            alt="Header"
            quality={100}
            className="w-full h-auto"
          />
          <div className="flex flex-col items-center justify-center gap-4 pb-6">
            <div className="w-[60%] text-center text-white bg-gradient-to-r from-[#299C3F] to-[#134223] p-2 rounded-b-[10px]">
              Registration Information 1
            </div>
            <h2
              className={`${
                fullName ? "text-[#000]" : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {fullName || "FULL NAME"}
            </h2>
            <h3
              className={`${
                formData.jobTitle ? "text-[#000]" : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {formData.jobTitle || "JOB TITLE"}
            </h3>
            <h3
              className={`${
                formData.company ? "text-[#000]" : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {formData.company || "COMPANY NAME"}
            </h3>
            <h3
              className={`${
                formData.country ? "text-[#000]" : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {formData.country || "COUNTRY OF RESIDENCE"}
            </h3>
          </div>
          <div className="text-center flex flex-col gap-2 shadow-[0_0_15px_-7px_#ACACAC] p-5">
            <div className=" text-[#ACACAC] text-[1.3rem]">BADGE CATEGORY</div>
            <div className="text-[#000] font-bold text-[1.7rem]">VISITOR</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-10 pt-8 ">
        {hasPrev && (
          <button
            type="button"
            onClick={onPrev}
            className=" font-archivo px-6 py-3 border border-gray-300 text-white rounded-lg bg-gradient-to-r  from-[#5C2F66] to-[#25102C] transition-colors"
          >
            PREVIOUS
          </button>
        )}

        <button
          type="submit"
          className=" font-archivo px-8 py-3 bg-gradient-to-r from-[#27963D] to-[#134323] text-white rounded-lg transition-colors font-medium"
        >
          NEXT
        </button>
      </div>
    </form>
  );
}
