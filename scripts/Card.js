class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".elements__like-button");
    likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    const popupImage = document
      .querySelector("#imagePopup")
      .querySelector(".popup__image");
    const popupCaption = document
      .querySelector("#imagePopup")
      .querySelector(".popup__image-name");

    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;

    openModal(document.querySelector("#imagePopup"));
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }
}

export default Card;
