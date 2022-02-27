import { modalImage, modalTitle, modalPopup } from "../pages/index.js";
import { openModal } from "../utils/utils.js";

export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._link = data.url;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector).content
        .querySelector(".cards__card")
        .cloneNode(true);
  
        return cardElement;
    }
    
    _openCardImage() {
        modalImage.src = this._link;
        modalImage.alt = this._title;
        modalTitle.textContent = this._title;
        openModal(modalPopup);
    }

    _likeCard() {
        this._element.querySelector(".cards__like").classList.toggle("cards__like_liked");
    }

    _deleteCard() {
        this._element.closest(".cards__card").remove();
    }

    _setEventListeners() {
        this._element.querySelector(".cards__image").addEventListener("click", () => {
            this._openCardImage();
        });
        this._element.querySelector(".cards__delete").addEventListener("click", this._deleteCard.bind(this));
        this._element.querySelector(".cards__like").addEventListener("click", this._likeCard.bind(this));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector(".cards__image").src = this._link;
        this._element.querySelector(".cards__image").alt = this._title;
        this._element.querySelector(".cards__name").textContent = this._title;
    
        return this._element;
    }
}
  