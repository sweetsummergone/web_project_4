export default class FormValidator {
    constructor(settings, element) {
        this._settings = settings;
        this._element = element;
        
        this._inputList = Array.from(this._element.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._element.querySelector(this._settings.submitButtonSelector);
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
      
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };
      
    _setEventListeners() {
        // here, to check the button state in the very beginning only if button element exists
        if(this._buttonElement !== null) {
            this._toggleButtonState();
        }
        
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                // and here, to check it whenever any field input is changed
                this._toggleButtonState();
            });
        });
    }; 

    resetValidation() {
        this._toggleButtonState(); // controlling the submit button ==
  
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement) // clearing errors 
        });
  
      }

    enableValidation() {
        this._element.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }; 
}