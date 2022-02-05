import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { cards, validationSettings, modalEdit, modalAdd, modalPopup } from "./utils.js";
//
export const modalEditValidation = new FormValidator(validationSettings, modalEdit);
export const modalAddValidation = new FormValidator(validationSettings, modalAdd);
export const modalPopupValidation = new FormValidator(validationSettings, modalPopup);
//

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


//
export function renderCard(card) {
  const newCard = new Card(card, "#cards__card");
  const cardElement = newCard.generateCard();

  cards.prepend(cardElement);
}

// add content
initialCards.forEach(card => {
  renderCard({url: card.link, name: card.name});
});