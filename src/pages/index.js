import "./index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import { validationSettings, openModal, closeModal, toggleSaveButtonState } from "../scripts/utils/utils.js";
import {  cards, userName, userActivity, modalEdit, modalAdd, modalPopup,
          modalName, modalActivity, modalAddTitle, modalAddUrl, buttonSave, buttonSavePhoto,
          newName, newActivity, url, title,
          buttonEdit, buttonAdd, contentEdit, contentAdd } from "../scripts/utils/constants.js";
import { cardTemplate } from "../scripts/utils/templates.js";
import { initialCards } from "../scripts/utils/cards.js";
//
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

const cardsListSection = new Section ({
  items: initialCards, 
  renderer: renderCard,
}, cards);

const previewPopup = new PopupWithImage(modalPopup);

function renderCard(card) {
  const newCard = new Card({name: card.name, link: card.link}, previewPopup, cardTemplate);
  const cardElement = newCard.generateCard();

  return cardElement;
}

cardsListSection.renderItems();

const userInfo = new UserInfo ({ 
  userName: userName, 
  userJob: userActivity,
});

const editPopup = new PopupWithForm(modalEdit, saveProfile);
const addPopup = new PopupWithForm(modalAdd, saveCard);

//
const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);
const modalPopupValidation = new FormValidator(validationSettings, modalPopup);
//

function openEdit() {
  editPopup.open();
  editPopup.setEventListeners();
  renderSaveButtonState();
}

function openAdd() {
  addPopup.open();
  addPopup.setEventListeners();
  renderSavePhotoButtonState();
}

function saveProfile(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ userName: newName.value, userJob: newActivity.value });
  closeModal(modalEdit);
}

function saveCard(evt) {
  evt.preventDefault();
  cardsListSection.addItem({ link: url.value, name: title.value });
  toggleSaveButtonState(buttonSave, "disabled");
  closeModal(modalAdd);
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

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();
modalPopupValidation.enableValidation();