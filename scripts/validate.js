const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");

  const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorMessage = inputElement.validationMessage;

    errorElement.textContent = errorMessage;
    errorElement.classList.add("error");
    inputElement.classList.add("popup__input-error");
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove("error");
    inputElement.classList.remove("popup__input-error");
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

  const toggleInputError = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
    } else {
      showInputError(formElement, inputElement);
    }
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement);
      isValid();
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);

    const submitButton = formElement.querySelector(".popup__button");
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      submitButton.disabled = true;
      submitButton.classList.add("popup__button_disabled");

      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
      });
    });
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
