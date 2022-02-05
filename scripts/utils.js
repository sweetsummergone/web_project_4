import { renderCard, modalAddValidation, modalEditValidation, modalPopupValidation } from "./index.js";
//
export const cards = document.querySelector(".cards");
//
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
//
export const modalEdit = document.querySelector(".modal_edit");
export const modalAdd = document.querySelector(".modal_add");
export const modalPopup = document.querySelector(".modal_popup");
//
const buttonEdit = document.querySelector(".info__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonSave = document.querySelector(".modal__button-save");
const buttonSavePhoto = document.querySelector(".modal__button-save-photo");
//
const modalName = document.querySelector(".modal__input_type_name");
const modalActivity = document.querySelector(".modal__input_type_whois");
const modalAddTitle = document.querySelector(".modal__input_type_title");
const modalAddUrl = document.querySelector(".modal__input_type_url");
//
const modalImage = document.querySelector(".popup__image");
const modalTitle = document.querySelector(".popup__title");
//
const contentEdit = document.querySelector(".modal__content-edit");
const contentAdd = document.querySelector(".modal__content-add");
const newName = document.querySelector(".modal__input_type_name");
const newActivity = document.querySelector(".modal__input_type_whois");
const url = document.querySelector(".modal__input_type_url");
const title = document.querySelector(".modal__input_type_title");
//
const userName = document.querySelector(".info__name");
const userActivity = document.querySelector(".info__whois");
//
const modalOverlayList = Array.from(
  document.querySelectorAll(".modal__overlay")
);
const buttonCloseList = Array.from(
  document.querySelectorAll(".modal__button-close")
);
//

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_active"));
  }
}

function deleteCard(evt) {
  evt.currentTarget.closest(".cards__card").remove();
}

function openModal(modalWindow) {
  modalWindow.classList.add("modal_active");
  document.addEventListener("keydown", closeByEscape);
}

function openImage(evt) {
  modalImage.src = evt.currentTarget.src;
  modalImage.alt = evt.currentTarget.alt;
  modalTitle.textContent = evt.currentTarget.alt;
  openModal(modalPopup);
  modalPopupValidation.enableValidation();
}

function openEdit() {
  openModal(modalEdit);
  modalName.value = userName.textContent;
  modalActivity.value = userActivity.textContent;
  renderSaveButtonState();
  modalEditValidation.enableValidation();
}

function openAdd() {
  openModal(modalAdd);
  renderSavePhotoButtonState();
  modalAddValidation.enableValidation();
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_active");
  document.removeEventListener("keydown", closeByEscape);
}

function saveProfile(evt) {
  evt.preventDefault();
  userName.innerText = newName.value;
  userActivity.innerText = newActivity.value;

  closeModal(modalEdit);
}

function saveCard(evt) {
  evt.preventDefault();
  renderCard({ url: url.value, name: title.value });
  url.value = "";
  title.value = "";
  toggleSaveButtonState(buttonSave, "disabled");
  closeModal(modalAdd);
}

function toggleSaveButtonState(button, state) {
  if (state === "disabled") {
    button.disabled = true;
    button.classList.add("modal__button-save_disabled");
  } else if (state === "enabled") {
    button.disabled = false;
    button.classList.remove("modal__button-save_disabled");
  }
}

function renderSaveButtonState() {
  if (modalName.value === "" || modalActivity.value === "") {
    toggleSaveButtonState(buttonSave, "disabled");
  } else {
    toggleSaveButtonState(buttonSave, "enabled");
  }
}

function renderSavePhotoButtonState() {
  if (modalAddUrl.value === "" || modalAddTitle.value === "") {
    toggleSaveButtonState(buttonSavePhoto, "disabled");
  } else {
    toggleSaveButtonState(buttonSavePhoto, "enabled");
  }
}

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);
buttonCloseList.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".modal");
    closeModal(popup);
  });
});

contentEdit.addEventListener("submit", saveProfile);
contentAdd.addEventListener("submit", saveCard);

modalOverlayList.forEach((overlay) => {
  overlay.addEventListener("click", function () {
    const popup = overlay.closest(".modal");
    closeModal(popup);
  });
});

export { openImage, deleteCard };
