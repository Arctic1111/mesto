const formElement = document.querySelector(".popup");
const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const buttonCloseElement = document.querySelector(".popup__close-button");
const nameInput = formElement.querySelector("#name");
const professionInput = formElement.querySelector("#profession");
const nameInputNewValue = document.querySelector(".profile__name");
const professionInputNewValue = document.querySelector(".profile__profession");

const openPopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
  formElement.classList.add("popup_opened");
};

const closePopup = function () {
  formElement.classList.remove("popup_opened");
};

buttonEditElement.addEventListener("click", openPopup);
buttonCloseElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileHeading.textContent = nameInput.value;
  profileSubHeading.textContent = professionInput.value;

  closePopup();
}
