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
const deleteCard = dialogs.newCardFormElement.querySelector(
  ".elements__delete-button"
);

const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup = document.querySelector("#closeNewCardPopup");
const cardName = dialogs.newCardFormElement.querySelector("#newPlace");
const cardImageLink = dialogs.newCardFormElement.querySelector("#imgLink");
const likeButton = document.querySelector(".elements__like-button");

const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const nameInput = dialogs.profileFormElement.querySelector("#name");
const professionInput = dialogs.profileFormElement.querySelector("#profession");
const nameInputNewValue = document.querySelector(".profile__name");
const professionInputNewValue = document.querySelector(".profile__profession");

function fillProfilePopup() {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
}

function resetForm(formElement) {
  const form = formElement.form;
  if (form) {
    form.reset();
  }
}

function fillImagePopup(cardContent) {
  popupImage.src = cardContent.link;
  popupImage.alt = cardContent.name;
  imagePopupInput.textContent = cardContent.name;
}

function initializeCardListeners(cardElement, cardContent) {
  cardElement
    .querySelector(".elements__image")
    .addEventListener("click", () => {
      openModal(dialogs.imagePopup);
      fillImagePopup(cardContent);
    });

  closeImageModal.addEventListener("click", () => {
    closeModal(dialogs.imagePopup);
  });

  cardElement
    .querySelector(".elements__like-button")
    .addEventListener("click", () => {
      toggleFavoritePic(cardElement.querySelector(".elements__like-button"));
    });

  cardElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      removeImageCard(cardElement);
    });
}

function createCard(template, cardContent) {
  const cardElement = template
    .querySelector(".elements__element")
    .cloneNode(true);

  initializeCardListeners(cardElement, cardContent);

  cardElement.querySelector(".elements__image").src = cardContent.link;
  cardElement.querySelector(".elements__title").textContent = cardContent.name;
  cardElement.querySelector(".elements__title").alt = cardContent.name;

  return cardElement;
}

function cloneAndFillTemplate(cardContent) {
  const cardTemplate = document.querySelector("#card").content;
  cardsBlock.prepend(createCard(cardTemplate, cardContent));
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

  resetForm(dialogs.newCardFormElement);
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
  resetForm(dialogs.newCardFormElement);
});

buttonEditElement.addEventListener("click", () => {
  openModal(dialogs.profileFormElement);
  fillProfilePopup();
});

dialogs.newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
dialogs.profileFormElement.addEventListener("submit", handleProfileFormSubmit);

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

const newCardFormValidator = new FormValidator(
  {
    formSelector: ".popup__body",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "error",
  },
  dialogs.newCardFormElement
);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

function toggleFavoritePic(elem) {
  elem.classList.toggle("elements__like-button_active");
}

function removeImageCard(elem) {
  elem.remove();
}

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

document.addEventListener("click", closePopupOnOverlayClick);

document.querySelector(".popup__close-button").addEventListener("click", () => {
  closeModal(dialogs.profileFormElement);
});
