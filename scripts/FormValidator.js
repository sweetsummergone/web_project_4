export default class FormValidator {
    constructor(settings, element) {
        this._settings = settings;
        this._element = element;
    }

    _showInputError(data, formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(data.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(data.errorClass);
    };
        
    _hideInputError(data, formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(data.inputErrorClass);
        errorElement.classList.remove(data.errorClass);
        errorElement.textContent = "";
    };
      
    _checkInputValidity(data, formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(data, formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(data, formElement, inputElement);
        }
    };
      
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
      
    _toggleButtonState(data, inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(data.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(data.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };
      
    _setEventListeners(data, formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
        // here, to check the button state in the very beginning only if button element exists
        if(buttonElement !== null) {
            this._toggleButtonState(data, inputList, buttonElement);
        }
        
        inputList.forEach(inputElement => {
            inputElement.addEventListener("input", function () {
                this._checkInputValidity(data, formElement, inputElement);
                // and here, to check it whenever any field input is changed
                this._toggleButtonState(data, inputList, buttonElement);
            }.bind(this), false); // we need this for scoping self class
         });
    }; 

    enableValidation() {
        this._element.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(this._settings, this._element);
    }; 
}