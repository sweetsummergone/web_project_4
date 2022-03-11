// Webpack import CSS block
import "./index.css";
// Variables, contstants, element pickers
import { validationSettings } from "../scripts/utils/utils.js";
import {  cards, userName, userActivity, modalEdit, modalAdd, modalPopup, modalConfirm,
          modalName, modalActivity, buttonEdit, buttonAdd } from "../scripts/utils/constants.js";
import { cardTemplate } from "../scripts/utils/templates.js";
import { data as auth } from "../auth.js";
// Uncomment if it's necessary to work without fetching data.
// import { initialCards } from "../scripts/utils/cards.js";

// Classes
import Api from "../scripts/components/Api.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupConfirmation from "../scripts/components/PopupConfirmation.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
// Undiscovered thing (seems like lodash)
import { _ } from "core-js";
// Constants block
const api = new Api(auth);

const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);

const previewPopup = new PopupWithImage(modalPopup);
const editPopup = new PopupWithForm(modalEdit, saveProfile);
const addPopup = new PopupWithForm(modalAdd, saveCard);
const confirmPopup = new PopupConfirmation(modalConfirm, api.deleteCard, renderSection);

const userInfo = new UserInfo ({ 
  userName: userName,
  userJob: userActivity,
});

// Execution block

let cardsListSection;
let userId;

api.getUser()
.then(res => res.json())
.then((result) => {
    userId = result._id;
    userInfo.setUserInfo({name: result.name, whois: result.about});
});

renderSection();

// Functions block

function renderCard(card) {
  const isOwner = card.owner._id === userId;
  const newCard = new Card({_id: card._id, name: card.name, link: card.link, likes: card.likes.length}, isOwner, cardTemplate, handleCardClick, handleCardDelete);
  const cardElement = newCard.generateCard();

  return cardElement;
}

function renderSection() {
  api.getCards()
  .then(res => res.json())
  .then(cardsArr => {
    cardsListSection = new Section ({
      items: cardsArr, 
      renderer: renderCard,
    }, cards);

    cardsListSection.renderItems();
  });
}

function handleCardClick(link, name) {
  previewPopup.open(link, name);
}

function handleCardDelete(id) {
  const index = cardsListSection._renderedItems.map(function(e) { return e._id; }).indexOf(id);
  confirmPopup.open(id, index);
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
  api.saveCard(data)
  .then(res => res.json())
  .then(item => {
    cardsListSection.addItem({_id: item._id, link: data.url, name: data.title, likes: item.likes});
    renderSection();
  });
}

previewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
confirmPopup.setEventListeners();

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();