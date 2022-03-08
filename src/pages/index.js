import "./index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import { validationSettings } from "../scripts/utils/utils.js";
import {  cards, userName, userActivity, modalEdit, modalAdd, modalPopup,
          modalName, modalActivity, buttonEdit, buttonAdd } from "../scripts/utils/constants.js";
import { cardTemplate } from "../scripts/utils/templates.js";
// Uncomment if it's necessary to work without fetching data.
// import { initialCards } from "../scripts/utils/cards.js";
//
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { _ } from "core-js";
//
import { data as auth } from "../auth.js";

const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);

const previewPopup = new PopupWithImage(modalPopup);
const editPopup = new PopupWithForm(modalEdit, saveProfile);
const addPopup = new PopupWithForm(modalAdd, saveCard);

const userInfo = new UserInfo ({ 
  userName: userName,
  userJob: userActivity,
});

let cardsListSection;

fetch(`https://around.nomoreparties.co/v1/${auth.group}/users/me`, {
  headers: {
    authorization: auth.token 
  }
})
.then(res => res.json())
.then((result) => {
  userInfo.setUserInfo({name: result.name, whois: result.about});
}); 

fetch(`https://around.nomoreparties.co/v1/${auth.group}/cards`, {
  headers: {
    authorization: auth.token 
  }
})
.then(res => res.json())
.then(cardsArr => {
  cardsListSection = new Section ({
    items: cardsArr, 
    renderer: renderCard,
  }, cards);

  cardsListSection.renderItems();
})

function renderCard(card) {
  const newCard = new Card({name: card.name, link: card.link, likes: card.likes.length}, cardTemplate, handleCardClick);
  const cardElement = newCard.generateCard();

  return cardElement;
}

function handleCardClick(link, name) {
  previewPopup.open(link, name);
}

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
  userInfo.patchUserInfo(data, auth);
}

function saveCard(data) {
  fetch(`https://around.nomoreparties.co/v1/${auth.group}/cards`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: auth.token 
    },
    body: JSON.stringify({
      name: data.title,
      link: data.url
    })
  })
  .then(() => {
    cardsListSection.addItem({link: data.url, name: data.title});
  }); 
}

//

previewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();