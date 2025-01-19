import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
    name: "",
    birthday: "",
    gender: "",
  });

  const updateRegistrationData = (key, value) => {
    setRegistrationData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
