class Card {
  constructor(data, cardSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
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
    this._cardImage = this._element.querySelector(".elements__image");
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._handleOpenPopup(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }
}

export default Card;
