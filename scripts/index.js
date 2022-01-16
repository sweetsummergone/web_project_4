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
//
const formElement = document.querySelector(".modal__form");
const formInput = formElement.querySelector(".modal__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);
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

  closeModal(evt);
}

function saveCard(evt) {
  evt.preventDefault();

  const url = document.querySelector(".modal__input_type_url").value;
  const title = document.querySelector(".modal__input_type_title").value;
  renderCard(createCard({url: url, name: title}));

  closeModal(evt);
}

function toggleSaveButtonState(button,state) {
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

function saveInput() {
  modalName.value = document.querySelector(".info__name").innerText;
  modalActivity.value = document.querySelector(".info__whois").innerText;
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button-save_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__button-save_disabled");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button-save");

  // here, to check the button state in the very beginning
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // and here, to check it whenever any field input is changed
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const modalFormList = Array.from(formElement.querySelectorAll(".modal__form"));

    modalFormList.forEach((modalForm) => {
      setEventListeners(modalForm);
    });
  });
};

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

enableValidation();

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible"
// }); 