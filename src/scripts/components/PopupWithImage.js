import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    
    open(url, title) {
        this._popup.querySelector('.popup__image').src = url;
        this._popup.querySelector('.popup__image').alt = title;
        this._popup.querySelector('.popup__title').textContent = title;
        super.open();
    }
}