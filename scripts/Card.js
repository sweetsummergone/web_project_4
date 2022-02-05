import {openImage, deleteCard} from "./utils.js";

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
  
    _setEventListeners() {
        this._element.querySelector(".cards__image").addEventListener("click", openImage);
        this._element.querySelector(".cards__delete").addEventListener("click", deleteCard);
        this._element.querySelector(".cards__like").addEventListener("click", function (evt) {
            evt.target.classList.toggle("cards__like_liked");
        });
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
  