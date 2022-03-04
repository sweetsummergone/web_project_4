// This is the worst theme ever I did on this project. I did not understand anything of it. 
// I've just lost any motivation to continue studying here.
// So please, if you can, help me with it (Interfaces in OOP)
// I'll add webpack after correcting my classes.
// Thank you.

import "../../pages/index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { validationSettings, openModal, closeModal, toggleSaveButtonState } from "../utils/utils.js";
import { cards, userName, userActivity, modalEdit, modalAdd, modalPopup } from "../utils/constants.js";
import { cardTemplate } from "../utils/templates.js";
import { initialCards } from "../utils/cards.js";
//
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

const cardsListSection = new Section ({
  items: initialCards, 
  renderer: renderCard,
}, cards);

cardsListSection.renderItems();

const userInfo = new UserInfo ({ 
  userName: userName, 
  userJob: userActivity,
  renderer: renderInfo
});

const previewPopup = new PopupWithImage({
  popupSelector: '.modal_popup',
  url: '.popup__image',
  title: '.popup__title',
});

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
  const newCard = new Card(card, cardTemplate);
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