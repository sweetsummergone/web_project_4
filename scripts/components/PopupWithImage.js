import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, {url, title}) {
        super(popupSelector);
        this.url = url;
        this.title = title;
    }
    
    open() {
        super._popupSelector.classList('popup__image').src = this.url;
        super._popupSelector.classList('popup__title').textContent = this.title;
        super.open();
    }
  
    close() {
        super.close();
    }
}