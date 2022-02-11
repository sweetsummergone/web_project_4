import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { validationSettings, openModal, closeModal, toggleSaveButtonState } from "./utils.js";
import { initialCards } from "./cards.js";
//
const cards = document.querySelector(".cards");
//
const modalEdit = document.querySelector(".modal_edit");
const modalAdd = document.querySelector(".modal_add");
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
export const modalPopup = document.querySelector(".modal_popup");
export const modalImage = document.querySelector(".popup__image");
export const modalTitle = document.querySelector(".popup__title");
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
const modalOverlayList = document.querySelectorAll(".modal__overlay");
const buttonCloseList = Array.from(
  document.querySelectorAll(".modal__button-close")
);
//
const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);
const modalPopupValidation = new FormValidator(validationSettings, modalPopup);
//

function openEdit() {
  openModal(modalEdit);
  modalName.value = userName.textContent;
  modalActivity.value = userActivity.textContent;
  renderSaveButtonState();
}

function openAdd() {
  openModal(modalAdd);
  renderSavePhotoButtonState();
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

function renderCard(card) {
  const newCard = new Card(card, "#cards__card");
  const cardElement = newCard.generateCard();

  cards.prepend(cardElement);
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

initialCards.forEach(card => {
  renderCard({url: card.link, name: card.name});
});

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();
modalPopupValidation.enableValidation();