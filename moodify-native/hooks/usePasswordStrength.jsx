import { useState } from "react";

const usePasswordStrength = () => {
  const [strengthMessage, setStrengthMessage] = useState("");
  const [isStrong, setIsStrong] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (password.length < minLength) {
      setStrengthMessage("Password must be at least 8 characters long.");
      setIsStrong(false);
    } else if (!hasUppercase) {
      setStrengthMessage("Password must include at least one uppercase letter.");
      setIsStrong(false);
    } else if (!hasLowercase) {
      setStrengthMessage("Password must include at least one lowercase letter.");
      setIsStrong(false);
    } else if (!hasNumber) {
      setStrengthMessage("Password must include at least one number.");
      setIsStrong(false);
    } else if (!hasSpecialChar) {
      setStrengthMessage("Password must include at least one special character.");
      setIsStrong(false);
    } else {
      setStrengthMessage("Password is strong.");
      setIsStrong(true);
    }
  };

  return { validatePassword, strengthMessage, isStrong };
};

export default usePasswordStrength;
