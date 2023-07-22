const disableSubmitButton = (submitButton, config) => {
  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );

    const showInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      const errorMessage = inputElement.validationMessage;

      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
      inputElement.classList.add(settings.inputErrorClass);
    };

    const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );

      errorElement.textContent = "";
      errorElement.classList.remove(settings.errorClass);
      inputElement.classList.remove(settings.inputErrorClass);
    };

    const isValid = () => {
      const isFormValid = inputList.every(
        (inputElement) => inputElement.validity.valid
      );

      if (isFormValid) {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.disabled = false;
      } else {
        submitButton.classList.add(settings.inactiveButtonClass);
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

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      disableSubmitButton(submitButton, settings);

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
