
  export function numericOnly(event){
    //it's used for mobile numbers - thus allowed '+' value also at start of the string (add this to onKeyDown event)
    const key = event.key;
    const cursorPosition = event.target.selectionStart;
    const value = event.target.value;

    // Allow only numeric characters
    if (
      !/[0-9]/.test(key) &&
      key.length === 1 &&
      !(event.ctrlKey && key.toLowerCase() === "v") &&
      !(event.ctrlKey && key.toLowerCase() === "a") &&
      !(event.ctrlKey && key.toLowerCase() === "c") &&
      !(event.ctrlKey && key.toLowerCase() === "z") &&
      !(
        event.shiftKey &&
        key.toLowerCase() === "+" &&
        cursorPosition === 0 &&
        !value.includes("+")
      )
    ) {
      event.preventDefault();
    }
  };