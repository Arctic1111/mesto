import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";

const cardsBlock = document.querySelector(".elements");
const profilePopup = document.querySelector("#editProfilePopup");
const newCardPopup = document.querySelector("#newCardPopup");
const imagePopup = document.querySelector("#imagePopup");

const profileForm = profilePopup.querySelector(".popup__body");
const newCardForm = newCardPopup.querySelector(".popup__body");

const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const buttonCloseElement = profilePopup.querySelector(".popup__close-button");

const cardTemplate = document.querySelector("#card").content;

const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup =
  newCardPopup.querySelector("#closeNewCardPopup");

const nameInput = profileForm.querySelector("#name");
const professionInput = profileForm.querySelector("#profession");

function renderInitialCards() {
  initialCards.forEach((cardContent) => {
    const cardElement = createCard(cardContent);
    addCardToContainer(cardElement);
  });
}

function openModal(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyPress);
  document.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  document.removeEventListener("mousedown", handleOverlayClick);
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && evt.target.classList.contains("popup__container")) {
    closeModal(openedPopup);
  }
}

function fillProfilePopup() {
  nameInput.value = profileHeading.textContent;
  professionInput.value = profileSubHeading.textContent;
}

function resetForm(formElement) {
  formElement.reset();
}

function initializeCardListeners(card, cardContent) {
  const cardImage = card.querySelector(".elements__image");

  cardImage.addEventListener("click", () => {
    openModal(imagePopup);
    imagePopup.querySelector(".popup__image").src = cardContent.link;
    imagePopup.querySelector(".popup__image").alt = cardContent.name;
    imagePopup.querySelector(".popup__image-name").textContent =
      cardContent.name;
  });

  card.querySelector(".elements__like-button").addEventListener("click", () => {
    card
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  });

  card
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      card.remove();
    });
}

function createCard(cardContent) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  initializeCardListeners(cardElement, cardContent);

  return cardElement;
}

function addCardToContainer(card) {
  cardsBlock.prepend(card);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileHeading.textContent = nameInput.value;
  profileSubHeading.textContent = professionInput.value;

  closeModal(profilePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: newCardForm.querySelector("#newPlace").value,
    link: newCardForm.querySelector("#imgLink").value,
  };

  const cardElement = createCard(newCard);
  addCardToContainer(cardElement);

  resetForm(newCardForm);
  closeModal(newCardPopup);
}

buttonEditElement.addEventListener("click", () => {
  openModal(profilePopup);
  fillProfilePopup();
});

buttonCloseElement.addEventListener("click", () => {
  closeModal(profilePopup);
});

buttonOpenNewCardPopup.addEventListener("click", () => {
  openModal(newCardPopup);
});

buttonCloseNewCardPopup.addEventListener("click", () => {
  closeModal(newCardPopup);
  resetForm(newCardForm);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

const profileFormValidator = new FormValidator(
  {
    formSelector: ".popup__body",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "error",
  },
  profileForm
);

const newCardFormValidator = new FormValidator(
  {
    formSelector: ".popup__body",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "error",
  },
  newCardForm
);

renderInitialCards();

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
