export default class Card {
    constructor({name, link}, cardSelector) {
        this._title = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
        const cardElement = this._cardSelector.content
        .querySelector(".cards__card")
        .cloneNode(true);
  
        return cardElement;
    }

    _likeCard() {
        this._like.classList.toggle("cards__like_liked");
    }

    _deleteCard() {
        this._closest.remove();
    }

    _setEventListeners() {
        this._delete.addEventListener("click", this._deleteCard.bind(this));
        this._like.addEventListener("click", this._likeCard.bind(this));
    }

    generateCard() {
        this._element = this._getTemplate();
        //
        this._like = this._element.querySelector(".cards__like");
        this._closest = this._element.closest(".cards__card");
        this._image = this._element.querySelector(".cards__image");
        this._delete = this._element.querySelector(".cards__delete")

        this._setEventListeners();
    
        this._image.src = this._link;
        this._image.alt = this._title;
        this._element.querySelector(".cards__name").textContent = this._title;
    
        return this._element;
    }
}
  