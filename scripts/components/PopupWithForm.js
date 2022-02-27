import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunc) {
      super(popupSelector);
      this._submitFunc = submitFunc;
    }
    
    _getInputValues() {
      let obj = {};
      super._popupSelector.querySelectorAll(".modal__input").forEach(input => {
          obj[input] = input.value;
      });
      return obj;
    }

    setEventListeners() {
      super._popupSelector.addEventListener("submit", this._submitFunc);
    }

    open() {
      super.open();
    }
  
    close() {
      super.close();
      super._popupSelector.querySelectorAll(".modal__input").forEach(input => {
        input.value = "";
      });
    }
}