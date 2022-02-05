export default class FormValidator {
    constructor(settings, element) {
        this._settings = settings;
        this._element = element;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };
        
    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    };
      
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
      
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
      
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };
      
    _setEventListeners() {
        const inputList = Array.from(this._element.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._element.querySelector(this._settings.submitButtonSelector);
        // here, to check the button state in the very beginning only if button element exists
        if(buttonElement !== null) {
            this._toggleButtonState(inputList, buttonElement);
        }
        
        inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                // and here, to check it whenever any field input is changed
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }; 

    enableValidation() {
        this._element.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }; 
}