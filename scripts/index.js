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

function initializeCardsArray() {
  initialCards.map((card) => cloneAndFillTemplate(card));
}

function fillProfilePopup() {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
}

function fillImagePopup() {
  popupImage.src = cardContent.link;
  popupImage.alt = cardContent.name;
  imagePopupInput.textContent = cardContent.name;
}

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

const openPicModal = function () {
  imagePopup.classList.add("popup_opened");
};

const closePicModal = function () {
  imagePopup.classList.remove("popup_opened");
};

const openModal = function (elemName) {
  dialogs[elemName].classList.add("popup_opened");
};

const closeModal = function (elemName) {
  dialogs[elemName].classList.remove("popup_opened");
};

function initializeListeners(elem) {
  elem.querySelector(".elements__image").addEventListener("click", () => {
    openModal("imagePopup");
    fillImagePopup(cardContent);
  });

  closeImageModal.addEventListener("click", closeModal);

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

function createCard(elem, cardContent) {
  initializeListeners(elem, cardContent);

  elem.querySelector(".elements__image").src = cardContent.link;
  elem.querySelector(".elements__title").textContent = cardContent.name;
  elem.querySelector(".elements__title").alt = cardContent.name;

  return elem;
}

function cloneAndFillTemplate(cardContent) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);

  cardsBlock.prepend(createCard(cardElement, cardContent));
}

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

  cloneAndFillTemplate(newCard, initialCards.length);
  closeModal("newCardFormElement");
}

buttonOpenNewCardPopup.addEventListener("click", () => {
  openModal("newCardFormElement");
});
buttonCloseNewCardPopup.addEventListener("click", () => {
  closeModal("newCardFormElement");
});

dialogs.newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

buttonEditElement.addEventListener("click", () => {
  openModal("profileFormElement");
  fillProfilePopup();
});

buttonCloseElement.addEventListener("click", () => {
  closeModal("profileFormElement");
});

dialogs.profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initializeCardsArray();
