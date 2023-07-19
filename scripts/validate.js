const formElement = document.querySelector(".popup__body");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");

  const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorMessage = errorElement.textContent;

    errorElement.classList.add("error");
    inputElement.classList.add("popup__input-error");

    if (inputElement.validity.valid) {
      errorElement.classList.remove("error");
      inputElement.classList.remove("popup__input-error");
      errorElement.classList.add("error_disabled");
    } else {
      errorElement.textContent = errorMessage;
      errorElement.classList.remove("error_disabled");
    }
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("error");
      errorElement.classList.add("error_disabled");
    }
  };

  const isValid = () => {
    const isFormValid = inputList.every(
      (inputElement) => inputElement.validity.valid
    );

    if (isFormValid) {
      submitButton.classList.remove("popup__button_disabled");
      submitButton.disabled = false;
    } else {
      submitButton.classList.add("popup__button_disabled");
      submitButton.disabled = true;
    }
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid();
      showInputError(formElement, inputElement);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: ".popup__body",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "error",
});
