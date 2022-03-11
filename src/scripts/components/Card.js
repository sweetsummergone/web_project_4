export default class Card {
    constructor({_id, name, link, likes}, isOwner, cardSelector, cardClickHandler, cardDeleteHandler) {
        this._id = _id;
        this._title = name;
        this._link = link;
        this._likes = likes;
        this._isOwner = isOwner;
        this._cardSelector = cardSelector;
        this._cardClickHandler = cardClickHandler;
        this._cardDeleteHandler = cardDeleteHandler;
    }
  
    _getTemplate() {
        const cardElement = this._cardSelector.content
        .querySelector(".cards__card")
        .cloneNode(true);
  
        return cardElement;
    }

    _likeCard() {
        this._like.classList.contains("likes__like_liked") ? this._likes -= 1 : this._likes += 1;
        this._element.querySelector(".likes__count").textContent = this._likes;
        this._like.classList.toggle("likes__like_liked");
    }

    _deleteCard() {
        this._cardDeleteHandler(this._id);
    }

    _setEventListeners() {
        this._delete.addEventListener("click", this._deleteCard.bind(this));
        this._like.addEventListener("click", this._likeCard.bind(this));
        this._image.addEventListener("click", () => {
            this._cardClickHandler(this._link, this._title);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        //
        this._like = this._element.querySelector(".likes__like");
        this._closest = this._element.closest(".cards__card");
        this._image = this._element.querySelector(".cards__image");
        this._delete = this._element.querySelector(".cards__delete");

        if (!this._isOwner) {
            this._delete.remove();
        }

        this._setEventListeners();
    
        this._image.src = this._link;
        this._image.alt = this._title;
        this._element.querySelector(".cards__name").textContent = this._title;
        this._element.querySelector(".likes__count").textContent = this._likes;
    
        return this._element;
    }
}
  