import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title');
    }

    open(url, title) {
        this._image.src = url;
        this._image.alt = title;
        this._title.textContent = title;
        super.open();
    }
}