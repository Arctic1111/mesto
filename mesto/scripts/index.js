const cardsBlock = document.querySelector(".elements");
const imagePopupInput = document.querySelector(".popup__image-name");
const imageInput = document.querySelector(".elements__image");
const titleInput = document.querySelector(".elements__title");

const openModalButton = document.querySelector(".elements__image-button");
const closeImageModal = document.querySelector("#closeImagePopup");
const deleteCard = document.querySelector(".elements__delete-button");

const dialogs = {
  profileFormElement: document.querySelector("#editProfilePopup"),
  newCardFormElement: document.querySelector("#newCardPopup"),
  imagePopup: document.querySelector("#imagePopup"),
};

const popupImage = imagePopup.querySelector(".popup__image");
const newCardFormElement = document.querySelector("#newCardPopup");
const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup = document.querySelector("#closeNewCardPopup");
const cardName = dialogs.newCardFormElement.querySelector("#newPlace");
const cardImageLink = dialogs.newCardFormElement.querySelector("#imgLink");
const likeButton = document.querySelector(".elements__like-button");

const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const buttonCloseElement = document.querySelector(".popup__close-button");
const nameInput = dialogs.profileFormElement.querySelector("#name");
const professionInput = dialogs.profileFormElement.querySelector("#profession");
const nameInputNewValue = document.querySelector(".profile__name");
const professionInputNewValue = document.querySelector(".profile__profession");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const removeImageCard = function (elem) {
  elem.remove();
};

const toggleFavoritePic = function (elem) {
  if (elem.classList.value.includes("active")) {
    elem.classList.value = "elements__like-button";
  } else {
    elem.classList.value = "elements__like-button_active";
  }
};

const openModal = function (elemName) {
  dialogs[elemName].classList.add("popup_opened");
};

const closeModal = function (elemName) {
  dialogs[elemName].classList.remove("popup_opened");
};

function fillProfilePopup() {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
}

function fillImagePopup(cardContent) {
  popupImage.src = cardContent.link;
  popupImage.alt = cardContent.name;
  imagePopupInput.textContent = cardContent.name;
}

function initializeCardListeners(elem, cardContent) {
  elem.querySelector(".elements__image").addEventListener("click", () => {
    openModal("imagePopup");
    fillImagePopup(cardContent);
  });

  closeImageModal.addEventListener("click", () => {
    closeModal("imagePopup");
  });

  elem
    .querySelector(".elements__like-button")
    .addEventListener("click", (evt) => {
      toggleFavoritePic(evt.target);
    });

  elem
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      removeImageCard(elem);
    });
}

function clearNewCardModal() {
  cardName.value = "";
  cardImageLink.value = "";
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

buttonOpenNewCardPopup.addEventListener("click", () => {
  clearNewCardModal();
  openModal("newCardFormElement");
});
buttonCloseNewCardPopup.addEventListener("click", () => {
  closeModal("newCardFormElement");
});

buttonEditElement.addEventListener("click", () => {
  openModal("profileFormElement");
  fillProfilePopup();
});

buttonCloseElement.addEventListener("click", () => {
  closeModal("profileFormElement");
});

dialogs.newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
dialogs.profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileHeading.textContent = nameInput.value;
  profileSubHeading.textContent = professionInput.value;

  closeModal("profileFormElement");
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardName.value,
    link: cardImageLink.value,
  };

  cloneAndFillTemplate(newCard);
  closeModal("newCardFormElement");
}

function initializeCardsArray() {
  initialCards.map((card) => cloneAndFillTemplate(card));
}

initializeCardsArray();

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    closeModal("imagePopup");
    closeModal("newCardFormElement");
    closeModal("profileFormElement");
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closeModal("imagePopup");
    closeModal("newCardFormElement");
    closeModal("profileFormElement");
  }
}

buttonOpenNewCardPopup.addEventListener("click", () => {
  clearNewCardModal();
  openModal("newCardFormElement");
});
buttonCloseNewCardPopup.addEventListener("click", () => {
  closeModal("newCardFormElement");
});

buttonEditElement.addEventListener("click", () => {
  openModal("profileFormElement");
  fillProfilePopup();
});
buttonCloseElement.addEventListener("click", () => {
  closeModal("profileFormElement");
});

document.addEventListener("click", handleOverlayClick);
document.addEventListener("keydown", handleEscKeyPress);
