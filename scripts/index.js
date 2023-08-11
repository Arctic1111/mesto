import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";

const cardsBlock = document.querySelector(".elements");
const dialogs = {
  profileFormElement: document.querySelector("#editProfilePopup"),
  newCardFormElement: document.querySelector("#newCardPopup"),
  imagePopup: document.querySelector("#imagePopup"),
};

const imagePopupInput = dialogs.imagePopup.querySelector(".popup__image-name");
const popupImage = dialogs.imagePopup.querySelector(".popup__image");
const imageInput = dialogs.newCardFormElement.querySelector(".elements__image");
const titleInput = dialogs.newCardFormElement.querySelector(".elements__title");

const openModalButton = dialogs.newCardFormElement.querySelector(
  ".elements__image-button"
);
const closeImageModal = document.querySelector("#closeImagePopup");
const closeProfilePopup =
  dialogs.profileFormElement.querySelector("#closeProfilePopup");
const deleteCard = dialogs.newCardFormElement.querySelector(
  ".elements__delete-button"
);

const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup =
  dialogs.newCardFormElement.querySelector("#closeNewCardPopup");
const cardForm = dialogs.newCardFormElement.querySelector(".popup__body");
const cardName = cardForm.querySelector("#newPlace");
const cardImageLink = cardForm.querySelector("#imgLink");
const likeButton = document.querySelector(".elements__like-button");

const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const nameInput = dialogs.profileFormElement.querySelector("#name");
const professionInput = dialogs.profileFormElement.querySelector("#profession");
const nameInputNewValue = document.querySelector(".profile__name");
const professionInputNewValue = document.querySelector(".profile__profession");

const profileFormValidator = new FormValidator(
  {
    formSelector: ".popup__body",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "error",
  },
  dialogs.profileFormElement
);

profileFormValidator.enableValidation();

function fillProfilePopup() {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
}

function fillImagePopup(cardContent) {
  popupImage.src = cardContent.link;
  popupImage.alt = cardContent.name;
  imagePopupInput.textContent = cardContent.name;
}

function openImagePopup(name, link) {
  fillImagePopup({ name, link });
  openModal(dialogs.imagePopup);

  closeImageModal.addEventListener("click", () => {
    closeModal(dialogs.imagePopup);
  });
}

function createCard(cardContent) {
  const card = new Card(cardContent, "#card", openImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function cloneAndFillTemplate(cardContent) {
  const cardTemplate = document.querySelector("#card").content;
  cardsBlock.prepend(createCard(cardContent));
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileHeading.textContent = nameInput.value;
  profileSubHeading.textContent = professionInput.value;

  closeModal(dialogs.profileFormElement);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardName.value,
    link: cardImageLink.value,
  };

  cloneAndFillTemplate(newCard);
  closeModal(dialogs.newCardFormElement);

  cardForm.reset();
  newCardFormValidator.resetValidation();
}

function initializeCardsArray() {
  initialCards.forEach((card) => cloneAndFillTemplate(card));
}

initializeCardsArray();

buttonOpenNewCardPopup.addEventListener("click", () => {
  openModal(dialogs.newCardFormElement);
});

buttonCloseNewCardPopup.addEventListener("click", () => {
  closeModal(dialogs.newCardFormElement);
  cardForm.reset();
});

buttonEditElement.addEventListener("click", () => {
  openModal(dialogs.profileFormElement);
  fillProfilePopup();
});

dialogs.newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
dialogs.profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const newCardFormValidator = new FormValidator(
  {
    formSelector: ".popup__body",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "error",
  },
  cardForm
);

newCardFormValidator.enableValidation();

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
}

function openModal(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyPress);
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function closePopupOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closeModal(evt.target);
  }
}

dialogs.newCardFormElement
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closeModal(dialogs.newCardFormElement);
  });

dialogs.profileFormElement
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closeModal(dialogs.profileFormElement);
  });

document.addEventListener("click", closePopupOnOverlayClick);
