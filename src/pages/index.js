import "./index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import { validationSettings } from "../scripts/utils/utils.js";
import {  cards, userName, userActivity, modalEdit, modalAdd, modalPopup,
          modalName, modalActivity, buttonEdit, buttonAdd } from "../scripts/utils/constants.js";
import { cardTemplate } from "../scripts/utils/templates.js";
import { initialCards } from "../scripts/utils/cards.js";
//
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { _ } from "core-js";

const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);

const cardsListSection = new Section ({
  items: initialCards, 
  renderer: renderCard,
}, cards);

const previewPopup = new PopupWithImage(modalPopup);

function renderCard(card) {
  const newCard = new Card({name: card.name, link: card.link}, cardTemplate, handleCardClick);
  const cardElement = newCard.generateCard();

  return cardElement;
}

function handleCardClick(link, name) {
  previewPopup.open(link, name);
}


cardsListSection.renderItems();

const userInfo = new UserInfo ({ 
  userName: userName, 
  userJob: userActivity,
});

const editPopup = new PopupWithForm(modalEdit, saveProfile);
const addPopup = new PopupWithForm(modalAdd, saveCard);

previewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();

//

function openEdit() {
  const userData = userInfo.getUserInfo();
  modalName.value = userData.userName;
  modalActivity.value = userData.userJob;
  editPopup.open();
  modalEditValidation.resetValidation();
}

function openAdd() {
  addPopup.open();
  modalAddValidation.resetValidation();
}

function saveProfile(data) {
  userInfo.setUserInfo(data);
}

function saveCard(data) {
  cardsListSection.addItem({link: data.url, name: data.title});
}

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();