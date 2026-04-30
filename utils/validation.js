import React from 'react';

export const validateForm = (email, password, isSignUp = true) => {
  const errors = [];
  const emailErrors= [];
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    emailErrors.push("Invalid email format");
  }

  if (isSignUp) {
    if (password.length < 6)
      errors.push("At least 6 character");
    if (!/[A-Z]/.test(password))
      errors.push("At least one uppercase letter");
    if (!/[a-z]/.test(password))
      errors.push("At least one lowercase letter");
    if (!/[0-9]/.test(password))
      errors.push("At least one number");
    if (!/[^A-Za-z0-9]/.test(password))
      errors.push("At least one special character");

    if (emailErrors.length > 0) {
      alert("Email errors:\n" + emailErrors.join("\n") + "\n\n");
      return false;
    }
    if (errors.length > 0) {
      alert("your password must containt:\n" + errors.join("\n"));
      return false;
    }
  } else {
    if (emailErrors.length > 0) {
      alert("Invalid email format");
      return false;
    }
    if (password.length === 0) {
      alert("Please enter your password");
      return false;
    }
  }
  return true;
      
};