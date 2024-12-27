import { useState } from "react";

const usePasswordStrength = () => {
  const [strengthMessage, setStrengthMessage] = useState("");

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (password.length < minLength) {
      setStrengthMessage("Password must be at least 8 characters long.");
      return false;
    } else if (!hasUppercase) {
      setStrengthMessage("Password must include at least one uppercase letter.");
      return false;
    } else if (!hasLowercase) {
      setStrengthMessage("Password must include at least one lowercase letter.");
      return false;
    } else if (!hasNumber) {
      setStrengthMessage("Password must include at least one number.");
      return false;
    } else if (!hasSpecialChar) {
      setStrengthMessage("Password must include at least one special character.");
      return false;
    } else {
      setStrengthMessage("Password is strong.");
      return true;
    }
  };

  return { validatePassword, strengthMessage };
};

export default usePasswordStrength;
