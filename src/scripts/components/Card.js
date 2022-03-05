export default class Card {
    constructor({name, link}, modalPopup, cardSelector) {
        // Object
        this._title = name;
        this._link = link;
        // Separate params
        this._cardSelector = cardSelector;
        this._modalPopup = modalPopup;
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
        this._image.addEventListener("click", () => {
            this.handleCardClick();
        });
        this._delete.addEventListener("click", this._deleteCard.bind(this));
        this._like.addEventListener("click", this._likeCard.bind(this));
    }
    
    handleCardClick() {
        this._modalPopup.open(this._link, this._title);
        this._modalPopup.setEventListeners();
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
  