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

const cardsBlock = document.querySelector(".elements");

function initializeCardsArray() {
  initialCards.map((card, index) => cloneAndFillTemplate(card, index));
}

function cloneAndFillTemplate(card, index) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);

  cardElement.id = index;
  cardElement.querySelector(".elements__image").src = card.link;
  cardElement.querySelector(".elements__image-button").id = index;
  cardElement.querySelector(".elements__title").textContent = card.name;
  cardElement.querySelector(".elements__delete-button").id = index;

  cardsBlock.prepend(cardElement);
}

initializeCardsArray();

const formElement = document.querySelector("#editProfilePopup");
const profileHeading = document.querySelector(".profile__name");
const profileSubHeading = document.querySelector(".profile__profession");
const buttonEditElement = document.querySelector(".profile__edit-button");
const buttonCloseElement = document.querySelector(".popup__close-button");
const nameInput = formElement.querySelector("#name");
const professionInput = formElement.querySelector("#profession");
const nameInputNewValue = document.querySelector(".profile__name");
const professionInputNewValue = document.querySelector(".profile__profession");

const newCardFormElement = document.querySelector("#newCardPopup");
const buttonOpenNewCardPopup = document.querySelector(".profile__add-button");
const buttonCloseNewCardPopup = document.querySelector("#closeNewCardPopup");
const cardName = newCardFormElement.querySelector("#newPlace");
const cardImageLink = newCardFormElement.querySelector("#imgLink");

const openProfilePopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  professionInput.value = professionInputNewValue.textContent;
  formElement.classList.add("popup_opened");
};

const closeProfilePopup = function () {
  formElement.classList.remove("popup_opened");
};

const toggleFavoritePic = function (data) {
  if (data.value.includes("active")) {
    data.value = "elements__like-button";
  } else {
    data.value = "elements__like-button_active";
  }
};

const removeImageCard = function (id) {
  delete initialCards[id];
  document.getElementById(id).remove();
};

const openAddCardPopup = function () {
  newCardFormElement.classList.add("popup_opened");
};

const closeAddCardPopup = function () {
  newCardFormElement.classList.remove("popup_opened");
};

buttonOpenNewCardPopup.addEventListener("click", openAddCardPopup);
buttonCloseNewCardPopup.addEventListener("click", closeAddCardPopup);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

buttonEditElement.addEventListener("click", openProfilePopup);
buttonCloseElement.addEventListener("click", closeProfilePopup);
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
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
  console.log(cardName, cardImageLink);

  initialCards.push(newCard);

  cloneAndFillTemplate(newCard, initialCards.length);
  closeAddCardPopup();
}

const imagePopup = document.querySelector("#imagePopup");
const imageInput = document.querySelector(".elements__image");
const titleInput = document.querySelector(".elements__title");
const imagePopupInput = document.querySelector(".popup__image-name");
const openModal = document.querySelector(".elements__image-button");
const closeModal = document.querySelector("#closeImagePopup");

const openImagePopup = function (elem) {
  imagePopup.classList.add("popup_opened");
  const imageUrl = elem.getElementsByTagName("img")[0].src;
  const cardElem = document.getElementById(elem.id);
  const imageTitle = cardElem.querySelector("h2");

  imagePopup.querySelector(".popup__image").src = imageUrl;
  imagePopupInput.textContent = imageTitle.textContent;
};

const closeImagePopup = function () {
  imagePopup.classList.remove("popup_opened");
};

openModal.addEventListener("click", openImagePopup);
closeModal.addEventListener("click", closeImagePopup);
