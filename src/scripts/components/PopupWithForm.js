import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, submitFunc) {
      super(popup);
      this._submitFunc = submitFunc;
      //
      this._form = this._popup.querySelector(".modal__form");
    }
    
    _getInputValues() {
      // Get all field elements
      this._inputList = this._popup.querySelectorAll(".modal__input");

      // Create an empty object
      this._formValues = {};

      // Add the values of the fields to this object
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      // Return the values object
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", () => {
        this._submitFunc(this._getInputValues());
        this._form.reset();
        this.close();
      });
    }

    open() {
      super.open();
    }
  
    close() {
      super.close();
    }
}