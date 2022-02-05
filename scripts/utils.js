export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_active"));
  }
}

export function openModal(modalWindow) {
  modalWindow.classList.add("modal_active");
  document.addEventListener("keydown", closeByEscape);
}

export function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_active");
  document.removeEventListener("keydown", closeByEscape);
}

export function toggleSaveButtonState(button, state) {
  if (state === "disabled") {
    button.disabled = true;
    button.classList.add("modal__button-save_disabled");
  } else if (state === "enabled") {
    button.disabled = false;
    button.classList.remove("modal__button-save_disabled");
  }
}