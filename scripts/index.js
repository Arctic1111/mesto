const cardsBlock = document.querySelector(".elements");
const imagePopup = document.querySelector("#imagePopup");
const imagePopupInput = document.querySelector(".popup__image-name");
const imageInput = document.querySelector(".elements__image");
const titleInput = document.querySelector(".elements__title");
const popupImage = imagePopup.querySelector(".popup__image");

const openModal = document.querySelector(".elements__image-button");
const closeImageModal = document.querySelector("#closeImagePopup");
const deleteCard = document.querySelector(".elements__delete-button");

const dialogs = {
  profileFormElement: document.querySelector("#editProfilePopup"),
  newCardFormElement: document.querySelector("#newCardPopup"),
};

const newCardFormElement = document.querySelector("#newCardPopup");
const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup = document.querySelector("#closeNewCardPopup");
const cardName = dialogs.newCardFormElement.querySelector("#newPlace");
const cardImageLink = dialogs.newCardFormElement.querySelector("#imgLink");

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

const removeImageCard = function (elem) {
  elem.remove();
};

const toggleFavoritePic = function (data) {
  if (data.value.includes("active")) {
    data.value = "elements__like-button";
  } else {
    data.value = "elements__like-button_active";
  }
};

const togglePicModal = function (cardContent, isOpened) {
  if (isOpened) {
    imagePopup.classList.add("popup_opened");
    popupImage.src = cardContent.link;
    popupImage.alt = cardContent.name;
    imagePopupInput.textContent = cardContent.name;
  } else {
    imagePopup.classList.remove("popup_opened");
  }
};

const toggleModal = function (elemName, isOpened) {
  if (isOpened) {
    dialogs[elemName].classList.add("popup_opened");
  } else {
    dialogs[elemName].classList.remove("popup_opened");
  }
};

function createCard(elem, cardContent) {
  elem.querySelector(".elements__image").addEventListener("click", () => {
    togglePicModal(cardContent, true);
  });

  closeImageModal.addEventListener("click", () => {
    togglePicModal(cardContent, false);
  });

  elem
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      removeImageCard(elem);
    });

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

  closeProfilePopup();
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardName.value,
    link: cardImageLink.value,
  };

  cloneAndFillTemplate(newCard, initialCards.length);
  toggleModal("newCardFormElement", false);
}

buttonOpenNewCardPopup.addEventListener("click", () => {
  toggleModal("newCardFormElement", true);
});
buttonCloseNewCardPopup.addEventListener("click", () => {
  toggleModal("newCardFormElement", false);
});

dialogs.newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

buttonEditElement.addEventListener("click", () => {
  toggleModal("profileFormElement", true);
});

buttonCloseElement.addEventListener("click", () => {
  toggleModal("profileFormElement", false);
});

dialogs.profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initializeCardsArray();
