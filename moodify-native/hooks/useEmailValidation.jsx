import { useState } from "react";

const useEmailValidation = () => {
  const [validationMessage, setValidationMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setValidationMessage("Email cannot be empty.");
      return false;
    } else if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return false;
    }

    setValidationMessage("");
    return true;
  };

  return { validateEmail, validationMessage };
};

export default useEmailValidation;
