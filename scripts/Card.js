class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._closeModal = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard(handleOpenPopup) {
    this._handleOpenPopup = handleOpenPopup;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

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
    this._handleOpenPopup(this._name, this._link);
  }

  setCloseModalHandler(closeModal) {
    this._closeModal = closeModal;
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
        this._closeModal(this._element);
      });
  }
}

export default Card;
