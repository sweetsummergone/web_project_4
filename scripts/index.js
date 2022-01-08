// 
const buttonEdit = document.querySelector(".info__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonSave = document.querySelector(".modal__button-save");
const buttonSavePhoto = document.querySelector(".modal__button-save-photo");
// 
const cards = document.querySelector(".cards");
const cardTemplate = document.querySelector("#cards__card").content;
// 
const modalEdit = document.querySelector(".modal_edit");
const modalAdd = document.querySelector(".modal_add");
const modalName = document.querySelector(".modal__input_type_name");
const modalActivity = document.querySelector(".modal__input_type_whois");
const modalAddTitle = document.querySelector(".modal__input_type_title");
const modalAddUrl = document.querySelector(".modal__input_type_url");
// 
const contentEdit = document.querySelector(".modal__content-edit");
const contentAdd = document.querySelector(".modal__content-add");
//
const userName = document.querySelector(".info__name");
const userActivity = document.querySelector(".info__whois");
// 
const modalList = Array.from(document.querySelectorAll(".modal"));
const buttonCloseList = Array.from(document.querySelectorAll(".modal__button-close"));

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

// add content
initialCards.forEach(card => {
  renderCard(createCard({url: card.link, name: card.name}));
});

const images = Array.from(document.querySelectorAll(".cards__image"));

function deleteCard(evt){
  evt.currentTarget.parentNode.remove();
}

function openImage(evt) {
  const modalPopup = document.querySelector(".modal_popup");
  const modalImage = document.querySelector(".popup__image");
  const modalTitle = document.querySelector(".popup__title");
  modalImage.src = evt.currentTarget.src;
  modalImage.alt = evt.currentTarget.alt;
  modalTitle.textContent = evt.currentTarget.alt;
  openModal(modalPopup);
}

function openModal(modalWindow) {
  modalWindow.classList.remove("modal_hidden");
}

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

function closeModal(evt) {
  evt.currentTarget.closest('.modal').classList.add("modal_hidden");
}

function createCard(data) {
  // clone the content of the template tag 
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardsImage = cardElement.querySelector(".cards__image")
  cardsImage.src = data.url;
  cardsImage.alt = data.name;
  cardElement.querySelector(".cards__name").textContent = data.name;
  cardElement.querySelector(".cards__delete").addEventListener("click", deleteCard);
  cardElement.querySelector(".cards__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__like_liked");
  });

  return cardElement;
}

function renderCard(card) {
  cards.prepend(card); 
}

function saveProfile(evt) {
  evt.preventDefault();

  const newName = document.querySelector(".modal__input_type_name");
  const newActivity = document.querySelector(".modal__input_type_whois");
  userName.innerText = newName.value;
  userActivity.innerText = newActivity.value;

  closeModal();
}

function saveCard(evt) {
  evt.preventDefault();

  const url = document.querySelector(".modal__input_type_url").value;
  const title = document.querySelector(".modal__input_type_title").value;
  renderCard(createCard({url: url, name: title}));

  closeModal();
}

function toggleButtonState(button,state) {
  if (state === "disabled") {
    button.disabled = true;
    button.classList.add("modal__button-save_disabled");
  }
  else if (state === "enabled") {
    button.disabled = false;
    button.classList.remove("modal__button-save_disabled");
  }
}

function renderSaveButtonState() {
  if (modalName.value === "" || modalActivity.value === "") {
    toggleButtonState(buttonSave, "disabled");
  } else {
    toggleButtonState(buttonSave, "enabled");
  }
}

function renderSavePhotoButtonState() {
    if (modalAddUrl.value === "" || modalAddTitle.value === "") {
      toggleButtonState(buttonSavePhoto, "disabled");
    } else {
      toggleButtonState(buttonSavePhoto, "enabled");
    }
}

function saveInput() {
  modalName.value = document.querySelector(".info__name").innerText;
  modalActivity.value = document.querySelector(".info__whois").innerText;
}

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);
buttonSavePhoto.addEventListener("click", createCard)
buttonCloseList.forEach(button => {
  button.addEventListener("click", closeModal);
});

contentEdit.addEventListener("submit",saveProfile);
contentAdd.addEventListener("submit",saveCard);

images.forEach(image => {
  image.addEventListener("click", openImage)
})

modalName.addEventListener("input", renderSaveButtonState);
modalActivity.addEventListener("input", renderSaveButtonState);
modalAddTitle.addEventListener("input", renderSavePhotoButtonState);
modalAddUrl.addEventListener("input", renderSavePhotoButtonState);