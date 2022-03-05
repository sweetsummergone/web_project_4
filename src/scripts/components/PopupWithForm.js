import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunc) {
      super(popupSelector);
      this._submitFunc = submitFunc;
    }
    
    _getInputValues() {
      const obj = {};
      super._popup.querySelectorAll(".modal__input").forEach(input => {
          obj[input] = input.value;
      });
      return obj;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", this._submitFunc);
    }

    open() {
      super.open();
    }
  
    close() {
      super.close();
      // Next function reset all fields in every close action (even if it not submit)
      // this._popup.querySelector(".modal__form").reset();
    }
}