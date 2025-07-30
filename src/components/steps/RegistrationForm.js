"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitFormData, selectFormState } from "@/store/reducers/formSlice";
import IdCardHeader from "@/../../public/images/id_card_header.png";
import Image from "next/image";
import SolutionsModal, {
  solutionList,
  subOptionsList,
} from "../modals/SolutionsModal";
import { numericOnly } from "@/lib/utils";

export default function RegistrationForm({
  formName,
  onNext,
  onPrev,
  hasPrev = true,
  validations,
}) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => selectFormState(state, formName));
  const forms = useSelector(state=>state.form)
  console.log("form",formName,forms)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSolutionsModal, setShowSolutionsModal] = useState(false);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);

  let formMethods;

  const FORM_FIELDS = {
    firstName: {
      type: "text",
      name: "personalInfo.firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      defaultValidation: { required: "First name is required" },
    },
    lastName: {
      type: "text",
      name: "personalInfo.lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      defaultValidation: { required: "Last name is required" },
    },
    email: {
      type: "email",
      name: "personalInfo.email",
      label: "Email Address",
      placeholder: "Enter your email address",
      defaultValidation: {
        required: "Email address is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    confirmEmail: {
      type: "email",
      name: "personalInfo.confirmEmail",
      label: "Confirm Email Address",
      placeholder: "Confirm your email address",
      defaultValidation: {
        required: "Please confirm your email address",
        validate: (value) =>
          value === watch("personalInfo.email") ||
          "Email addresses do not match",
      },
    },
    country: {
      type: "select",
      name: "personalInfo.country",
      label: "Country of residence",
      options: "countries",
      defaultValidation: { required: "Country of residence is required" },
    },
    region: {
      type: "select",
      name: "personalInfo.region",
      label: "Region",
      options: "countries",
      defaultValidation: { required: "Region is required" },
    },
    nationality: {
      type: "select",
      name: "personalInfo.nationality",
      label: "Nationality",
      options: "countries",
      defaultValidation: { required: "Nationality is required" },
    },
    phone: {
      type: "phone",
      name: "personalInfo.phone",
      label: "Mobile Number",
      defaultValidation: {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]{8,15}$/,
          message: "Please enter a valid phone number",
        },
      },
    },
    company: {
      type: "text",
      name: "personalInfo.company",
      label: "Company Name",
      placeholder: "Enter your company name",
      defaultValidation: { required: "Company name is required" },
    },
    jobTitle: {
      type: "text",
      name: "personalInfo.jobTitle",
      label: "Job Title",
      placeholder: "Enter your job title",
      defaultValidation: { required: "Job title is required" },
    },
    companyType: {
      type: "select",
      name: "personalInfo.companyType",
      label: "Company Type",
      options: "companyTypes",
      defaultValidation: { required: "Company type is required" },
    },
    industry: {
      type: "select",
      name: "personalInfo.industry",
      label: "Industry",
      options: "industries",
      defaultValidation: { required: "Industry is required" },
    },
  };

  const getDefaultValues = () => ({
    personalInfo: Object.keys(FORM_FIELDS).reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: "",
    }), {
      countryCode: "+971",
    }),
    selectedWorkshops: [],
    selectedSolutions: [],
    selectedSubSolutions: [],
  });

  formMethods = useForm({
    defaultValues: getDefaultValues()
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = formMethods;

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
      price: 499.99,
    },
    {
      id: "gitex-main",
      name: "GITEX Main Stage",
      duration: "4 Days",
      category: "main",
      price: 399.99,
    },
    {
      id: "ai-robotics",
      name: "Artificial Intelligence & Robotics",
      duration: "15",
      category: "technology",
      price: 599.99,
    },
    {
      id: "ai-everything",
      name: "AI Everything",
      duration: "4 Days",
      category: "technology",
      price: 449.99,
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      duration: "4 Days",
      category: "security",
      price: 349.99,
    },
    {
      id: "future-health",
      name: "Future Health (NEW)",
      duration: "2 Days",
      category: "health",
      price: 299.99,
    },
    {
      id: "digital-cities",
      name: "Digital Cities",
      duration: "1 Day",
      category: "smart-city",
      price: 199.99,
    },
    {
      id: "edtech",
      name: "Edtech",
      duration: "1 Day",
      category: "education",
      price: 149.99,
    },
    {
      id: "energy-transition",
      name: "Energy Transition",
      duration: "1 Day",
      category: "energy",
      price: 249.99,
    },
    {
      id: "intelligent-connectivity",
      name: "Intelligent Connectivity",
      duration: "1 Day",
      category: "connectivity",
      price: 199.99,
    },
    {
      id: "digital-finance",
      name: "Digital Finance",
      duration: "1 Day",
      category: "finance",
      price: 299.99,
    },
    {
      id: "future-mobility",
      name: "Future Mobility",
      duration: "1 Day",
      category: "mobility",
      price: 249.99,
    },
  ];
  const getFieldValidation = (fieldName, validations) => {
    if (!validations) return {};

    if (validations === "all") {
      return FORM_FIELDS[fieldName].defaultValidation;
    }

    return validations.includes(fieldName)
      ? FORM_FIELDS[fieldName].defaultValidation
      : {};
  };

  const renderFormField = ({ field, fieldConfig, errors, control, watch }) => {
    switch (fieldConfig.type) {
      case "text":
      case "email":
        return (
          <input
            {...field}
            value={field.value || ""}
            type={fieldConfig.type}
            placeholder={fieldConfig.placeholder}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors ? "border-red-500" : "border-gray-300"
            }`}
          />
        );
      case "select":
        const options = eval(fieldConfig.options);
        return (
          <select
            {...field}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option className="hidden" value="">Please Select</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "phone":
        return (
          <div className="flex gap-2">
            <Controller
              name="personalInfo.countryCode"
              control={control}
              render={({ field: codeField }) => (
                <select
                  {...codeField}
                  className={`max-w-[6rem] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                >
                  {countryCodes.map((code) => (
                    <option key={code.code} value={code.code}>
                      {code.code}
                    </option>
                  ))}
                </select>
              )}
            />
            <input
              {...field}
              value={field.value || ""}
              type="tel"
              maxLength={15}
              onKeyDown={numericOnly}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
          </div>
        );
      default:
        return null;
    }
  };
  //   {
  //   defaultValues: {
  //     personalInfo: Object.keys(FORM_FIELDS).reduce(
  //       (acc, fieldName) => ({
  //         ...acc,
  //         [fieldName]: "",
  //       }),
  //       {
  //         countryCode: "+971", // Default country code
  //       }
  //     ),
  //     selectedWorkshops: [],
  //     selectedSolutions: [],
  //     selectedSubSolutions: [],
  //     // ...formData,
  //   },
  // });

  const selectedSolutions = watch("selectedSolutions");
  const selectedSubSolutions = watch("selectedSubSolutions");
  // Handle form data population when component mounts or formName changes
  useEffect(() => {
    const storedFormData = formData || {};
    const defaultFormState = getDefaultValues();
    
    if (Object.keys(storedFormData).length > 0) {
      // If we have stored data, populate the form with it
      reset({
        personalInfo: {
          ...defaultFormState.personalInfo,
          ...storedFormData.personalInfo
        },
        selectedWorkshops: storedFormData.selectedWorkshops || [],
        selectedSolutions: storedFormData.selectedSolutions || [],
        selectedSubSolutions: storedFormData.selectedSubSolutions || [],
      });
      
      // Update selected workshops state
      setSelectedWorkshops(storedFormData.selectedWorkshops || []);
    } else {
      // If no stored data, reset to default empty state
      reset(defaultFormState);
      setSelectedWorkshops([]);
    }
  }, [formName, formData, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Calculate total amount based on selected workshops
      const totalAmount = selectedWorkshops.reduce((total, workshopId) => {
        const workshop = workshops.find((w) => w.id === workshopId);
        return total + (workshop?.price || 0);
      }, 0);

      // Prepare form data
      const formDataToSubmit = {
        personalInfo: data.personalInfo || {},
        selectedWorkshops: selectedWorkshops,
        selectedSolutions: data.selectedSolutions || [],
        selectedSubSolutions: data.selectedSubSolutions || [],
        totalAmount,
        lastUpdated: new Date().toISOString(),
      };

      // Dispatch form data
      dispatch(
        submitFormData({
          formName,
          formData: formDataToSubmit
        })
      );

      onNext();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const fullName =
    watch("personalInfo.firstName") || watch("personalInfo.lastName")
      ? `${watch("personalInfo.firstName")} ${watch("personalInfo.lastName")}`
      : null;
  const leftColumn = workshops.slice(0, Math.ceil(workshops.length / 2));
  const rightColumn = workshops.slice(Math.ceil(workshops.length / 2));

  const handleToggleWorkshop = (workshopId) => {
    setSelectedWorkshops((prev) => {
      if (prev.includes(workshopId)) {
        const updated = prev.filter((id) => id !== workshopId);
        setValue("selectedWorkshops", updated);
        return updated;
      } else {
        if (prev.length >= 5) {
          alert("You can select maximum 5 workshops");
          return prev;
        }
        const updated = [...prev, workshopId];
        setValue("selectedWorkshops", updated);
        return updated;
      }
    });
  };

  const renderFormFields = (validations) => {

    return Object.keys(FORM_FIELDS).map((fieldName) => {
      const fieldConfig = FORM_FIELDS[fieldName];
      if (!fieldConfig) return null;

      const validationRules = getFieldValidation(fieldName, validations);

      return (
        <div key={fieldName} className="w-full">
          <Controller
            name={fieldConfig.name}
            control={control}
            rules={validationRules}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {fieldConfig.label} {validationRules.required ? "*" : ""}
                </label>
                {renderFormField({
                  field,
                  fieldConfig,
                  errors: errors.personalInfo?.[fieldName],
                  control,
                  watch,
                })}
                {errors.personalInfo?.[fieldName] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personalInfo[fieldName].message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      );
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <div className="flex flex-col md:flex-row gap-4 px-4 border-1 rounded border-[#579B29] bg-white p-4">
        <div className="bg-white w-full md:min-w-[60rem]">
          <div className="bg-gradient-to-r from-[#299D3F] to-[#123F22] py-6 px-8 text-white rounded-t-[10px] flex md:flex-row flex-col md:items-center justify-between">
            <h2 className="md:text-3xl text-[24px] font-bold mb-2">
              Registration Information
            </h2>
            <p className="border-2 border-[#ffffff28] py-2 md:text-lg text-sm px-5 rounded-[10px] bg-[#ffffff08]">
              PREMIUM TICKET - FREEIncl. 19% VAT
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-[10px] shadow-[0_0_15px_-6px_#ACACAC]">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFormFields(validations)}
            </div>

            <div className="pt-6 gap-4 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm">
                What products & services are you interested in? *
              </div>

              <button
                type="button"
                onClick={() => setShowSolutionsModal(true)}
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
                    <div
                      key={category}
                      className=" bg-[#5E3169] text-white rounded-[10rem] px-4 py-1"
                    >
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
                    <div
                      key={category}
                      className=" bg-[#F5F5F5] border-2 border-[#D0D0D0] text-[#616161] rounded-[10rem] px-4 py-1"
                    >
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
                        checked={selectedWorkshops.includes(workshop.id)}
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
                        checked={selectedWorkshops.includes(workshop.id)}
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
                watch("personalInfo.jobTitle")
                  ? "text-[#000]"
                  : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {watch("personalInfo.jobTitle") || "JOB TITLE"}
            </h3>
            <h3
              className={`${
                watch("personalInfo.company")
                  ? "text-[#000]"
                  : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {watch("personalInfo.company") || "COMPANY NAME"}
            </h3>
            <h3
              className={`${
                watch("personalInfo.country")
                  ? "text-[#000]"
                  : "text-[#D4D4D4] "
              } text-[1.15rem]`}
            >
              {watch("personalInfo.country") || "COUNTRY OF RESIDENCE"}
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
            disabled={isSubmitting}
            onClick={onPrev}
            className=" font-archivo px-6 py-3 border border-gray-300 text-white rounded-lg bg-gradient-to-r  from-[#5C2F66] to-[#25102C] transition-colors"
          >
            PREVIOUS
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className=" font-archivo px-8 py-3 bg-gradient-to-r from-[#27963D] to-[#134323] text-white rounded-lg transition-colors font-medium"
        >
          NEXT
        </button>
      </div>

      {showSolutionsModal && (
        <SolutionsModal
          selectedSolutions={watch("selectedSolutions") || []}
          selectedSubSolutions={watch("selectedSubSolutions") || []}
          onUpdate={(solutions, subSolutions) => {
            setValue("selectedSolutions", solutions);
            if (subSolutions) {
              setValue("selectedSubSolutions", subSolutions);
            }
          }}
          onClose={() => setShowSolutionsModal(false)}
        />
      )}
    </form>
  );
}
