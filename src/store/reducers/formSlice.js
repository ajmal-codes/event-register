import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  forms: {},
  currentStep: "registration_form",
  formErrors: {},
  isSubmitting: false,
  formSubmissionStatus: {},
};

// Create selectors
export const selectFormState = (state, formName) => state.form.forms[formName];
export const selectFormErrors = (state, formName) => state.form.formErrors[formName];
export const selectCurrentStep = (state) => state.form.currentStep;
export const selectIsSubmitting = (state) => state.form.isSubmitting;

// Memoized selectors for complex computations
export const selectIsFormValid = createSelector(
  [selectFormState, selectFormErrors],
  (formState, formErrors) => {
    if (!formState || !formErrors) return false;
    return Object.keys(formErrors).length === 0;
  }
);

export const selectPersonalInfo = createSelector(
  [selectFormState],
  (formState) => formState?.personalInfo || {}
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submitFormData: (state, action) => {
      const { formName, formData } = action.payload;
      if (!state.forms[formName]) {
        state.forms[formName] = {};
      }

      // Structure and validate the data
      const {
        personalInfo,
        selectedWorkshops,
        selectedSolutions,
        selectedSubSolutions,
        totalAmount,
      } = formData;

      // Update the form with structured data
      state.forms[formName] = {
        personalInfo: {
          ...personalInfo,
          email: personalInfo.email?.toLowerCase(),
        },
        selectedWorkshops: selectedWorkshops || [],
        selectedSolutions: selectedSolutions || [],
        selectedSubSolutions: selectedSubSolutions || [],
        totalAmount: totalAmount || 0,
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        formStatus: 'completed'
      };

      // Clear any previous errors
      state.formErrors[formName] = null;
    },
    
    setFormError: (state, action) => {
      const { formName, error } = action.payload;
      state.formErrors[formName] = error;
    },

    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setCurrentStep: (state, action) => {
      const { step, formName } = action.payload;
      state.currentStep = step;
      
      // Track step completion in form data
      if (state.forms[formName]) {
        state.forms[formName].lastCompletedStep = step;
      }
    },

    resetForm: (state, action) => {
      const { formName } = action.payload;
      delete state.forms[formName];
      delete state.formErrors[formName];
    },

    initializeForm: (state, action) => {
      const { formName } = action.payload;
      if (!state.forms[formName]) {
        state.forms[formName] = {
          personalInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            countryCode: "+971",
            company: "",
            jobTitle: "",
            country: "",
            region: "",
            nationality: "",
            industry: "",
            companyType: "",
          },
          selectedWorkshops: [],
          selectedSolutions: [],
          selectedSubSolutions: [],
          totalAmount: 0,
          formStatus: 'initialized',
          createdAt: new Date().toISOString(),
          lastCompletedStep: null,
          isSubmitted: false
        };
      }
    },

    validateForm: (state, action) => {
      const { formName } = action.payload;
      const form = state.forms[formName];
      
      if (!form) return;

      const errors = {};
      const personalInfo = form.personalInfo;

      // Add validation logic as needed
      if (!personalInfo.firstName) errors.firstName = 'First name is required';
      if (!personalInfo.lastName) errors.lastName = 'Last name is required';
      if (!personalInfo.email) errors.email = 'Email is required';
      // Add more validations as needed

      state.formErrors[formName] = Object.keys(errors).length > 0 ? errors : null;
      return Object.keys(errors).length === 0;
    }
  },
});

// Export all actions
export const {
  submitFormData,
  setFormError,
  setSubmitting,
  setCurrentStep,
  resetForm,
  initializeForm,
  validateForm,
} = formSlice.actions;

export default formSlice.reducer;
