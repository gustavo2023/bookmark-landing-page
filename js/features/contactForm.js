import { isValidEmail } from "../utils/emailValidation.js";

const emailInput = document.getElementById("email");
const form = document.getElementById("email-form");
const emailInputContainer = document.getElementById("email-input-container");
const errorIcon = document.getElementById("error-icon");
const emailErrorMessage = document.getElementById("email-error");

const setErrorState = () => {
  emailInput.setAttribute("aria-invalid", "true");

  emailInputContainer.classList.add("border-2");
  emailInputContainer.classList.add("border-red-400");
  emailInputContainer.classList.add("bg-red-400");

  errorIcon.classList.remove("hidden");
  errorIcon.setAttribute("aria-hidden", "false");

  emailErrorMessage.classList.remove("hidden");
  emailErrorMessage.setAttribute("aria-hidden", "false");
};

const clearErrorState = () => {
  emailInput.setAttribute("aria-invalid", "false");
  emailInput.value = "";

  emailInputContainer.classList.remove("border-2");
  emailInputContainer.classList.remove("border-red-400");
  emailInputContainer.classList.remove("bg-red-400");

  errorIcon.classList.add("hidden");
  errorIcon.setAttribute("aria-hidden", "true");

  emailErrorMessage.classList.add("hidden");
  emailErrorMessage.setAttribute("aria-hidden", "true");
};

export const initContactForm = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;

    if (isValidEmail(email)) {
      clearErrorState();
      alert("Thank you for subscribing!");
    } else {
      setErrorState();
    }
  });
};
