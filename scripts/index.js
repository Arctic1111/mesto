import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";

const cardsContainer = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#editProfilePopup");
const newCardPopup = document.querySelector("#newCardPopup");
const imagePopup = document.querySelector("#imagePopup");
const closeImagePopup = imagePopup.querySelector("#closeImagePopup");
const closeNewCardPopup = newCardPopup.querySelector("#closeNewCardPopup");
const nameInput = editProfilePopup.querySelector("#name");
const professionInput = editProfilePopup.querySelector("#profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const newCardForm = newCardPopup.querySelector(".popup__form");

function openModal(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closeModal(evt.target);
  }
}

function handleEditButtonClick() {
  openModal(editProfilePopup);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function handleAddButtonClick() {
  openModal(newCardPopup);
}

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closeModal(editProfilePopup);
}

function createCard(data) {
  const card = new Card(data, "#card");
  return card.generateCard();
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: newCardForm.elements.newPlace.value,
    link: newCardForm.elements.imgLink.value,
  };
  const card = createCard(cardData);
  cardsContainer.prepend(card);
  newCardForm.reset();
  closeModal(newCardPopup);
}

initialCards.forEach((data) => {
  const card = createCard(data);
  cardsContainer.appendChild(card);
});

const formValidatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "error",
};

const editProfileFormValidator = new FormValidator(
  formValidatorConfig,
  editProfilePopup.querySelector(".popup__form")
);
editProfileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  formValidatorConfig,
  newCardForm
);
newCardFormValidator.enableValidation();

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
closeImagePopup.addEventListener("click", () => closeModal(imagePopup));
closeNewCardPopup.addEventListener("click", () => {
  closeModal(newCardPopup);
  newCardForm.reset();
});
document.addEventListener("click", handleOverlayClick);
