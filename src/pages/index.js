// Webpack import CSS block
import "./index.css";
// Variables, contstants, element pickers
import { validationSettings } from "../scripts/utils/utils.js";
import {  cards, userName, userActivity, userPhoto, buttonEdit, buttonAdd, avatar,
          modalEdit, modalAdd, modalPopup, modalConfirm,
          modalName, modalActivity, modalAvatar, loading } from "../scripts/utils/constants.js";
import { cardTemplate } from "../scripts/utils/templates.js";
// import { initialCards } from "../scripts/utils/cards.js"; // Uncomment if it's necessary to work without fetching data.

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
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12", 
  headers: {
      authorization: "613c39f3-4617-46e7-86c0-dd1b793af23e", // Now it's public
      "Content-Type": "application/json"
  }
});

const modalEditValidation = new FormValidator(validationSettings, modalEdit);
const modalAddValidation = new FormValidator(validationSettings, modalAdd);
const modalAvatarValidation = new FormValidator(validationSettings, modalAvatar);

const previewPopup = new PopupWithImage(modalPopup);
const editPopup = new PopupWithForm(modalEdit, saveProfile);
const addPopup = new PopupWithForm(modalAdd, saveCard);
const avatarPopup = new PopupWithForm(modalAvatar, saveAvatar);
const confirmPopup = new PopupConfirmation(modalConfirm, api.deleteCard, renderSection);

const userInfo = new UserInfo ({ 
  userName: userName,
  userJob: userActivity,
  userImage: userPhoto
});

// Execution block
let cardsListSection;
let userId;

api.awaitPromises()
.then(() => {
  api.getUser()
  .then((result) => {
    userId = result._id;
    userInfo.setUserInfo({name: result.name, whois: result.about});
    userInfo.setAvatar(result.avatar);
  })
  .then(() => {
    renderSection();
  })
  .finally(() => {
    setTimeout(() => {
      loading.remove();
    }, 1000);
    loading.classList.add("hidden");
  });
})
.catch((err) => {
  console.log(err); // log the error to the console
})

previewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

avatar.addEventListener("click", openAvatar);
buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);

modalEditValidation.enableValidation();
modalAddValidation.enableValidation();
modalAvatarValidation.enableValidation();

// Functions block

function renderCard(card) {
  const isOwner = ('owner' in card) ? card.owner._id === userId : true;
  let liked = false;
  card.likes.forEach(liker => {
    liked = liker._id === userId;
  });
  const newCard = new Card({_id: card._id, name: card.name, link: card.link, likes: card.likes.length}, isOwner, liked, cardTemplate, handleCardClick, handleCardDelete, handleCardLike);
  const cardElement = newCard.generateCard();

  return cardElement;
}

function renderSection() {
  api.getCards()
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

function handleCardLike(cardId, isLiked) {
  return new Promise((resolve, reject) => {
    if (isLiked) {
      api.removeLike(cardId)
      .then(data => resolve(data.likes.length))
      .catch(err => reject(`Error: ${err}`));
    } else {
      api.addLike(cardId)
      .then(data => resolve(data.likes.length))
      .catch(err => reject(`Error: ${err}`));;
    }
  }) 
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

function openAvatar() {
  avatarPopup.open();
  modalAvatarValidation.resetValidation();
}

function saveProfile(data) {
  return new Promise((resolve, reject) => {
    api.updateUser(data)
    .then(() => {
      userInfo.setUserInfo(data);
      resolve("ok");
    })
    .catch(err => reject(`Err: ${err}`));
  });
}

function saveCard(data) {
  return new Promise((resolve, reject) => {
    api.saveCard(data)
    .then(item => {
      cardsListSection.addItem({_id: item._id, link: item.link, name: item.name, likes: item.likes}); 
      renderSection();
      resolve("ok");
    })
    .catch(err => {
      reject(`Err: ${err}`);
    });
  })
}

function saveAvatar(data) {
  return new Promise((resolve, reject) => {
    api.updateAvatar(data.url)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      resolve("ok");
    })
    .catch(err => {
      reject(`Err: ${err}`);
    });
  });
}