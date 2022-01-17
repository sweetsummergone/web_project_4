const showInputError = (data, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
  };
  
  const hideInputError = (data, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (data, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(data, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(data, formElement, inputElement);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (data, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(data.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(data.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  const setEventListeners = (data, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
  
    // here, to check the button state in the very beginning
    toggleButtonState(data, inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(data, formElement, inputElement);
        // and here, to check it whenever any field input is changed
        toggleButtonState(data, inputList, buttonElement);
      });
    });
  }; 
  
  const enableValidation = (data) => {
    const formList = Array.from(document.querySelectorAll(".modal"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
  
      const modalFormList = Array.from(formElement.querySelectorAll(data.formSelector));
  
      modalFormList.forEach((modalForm) => {
        setEventListeners(data, modalForm);
      });
    });
  };

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button-save",
    inactiveButtonClass: "modal__button-save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
}); 