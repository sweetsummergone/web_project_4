// 
const buttonEdit = document.querySelector(".info__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonSave = document.querySelector(".modal__button-save");
const buttonSavePhoto = document.querySelector(".modal__button-save-photo");
// 
const facebook = document.querySelector(".facebook");
// 
const modalEdit = document.querySelector(".modal_edit");
const modalAdd = document.querySelector(".modal_add");
const modalName = document.querySelector(".modal__input_type_name");
const modalActivity = document.querySelector(".modal__input_type_whois");
const modalAddTitle = document.querySelector(".modal__input_type_title");
const modalAddUrl = document.querySelector(".modal__input_type_url");
// 
const userName = document.querySelector(".info__name");
const userActivity = document.querySelector(".info__whois");
// 
const modalList = Array.from(document.querySelectorAll(".modal"));
const modalFormList = Array.from(document.querySelectorAll(".modal__content"));
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
  renderCard(addCard({url: card.link, name: card.name}));
});

const images = Array.from(document.querySelectorAll(".facebook__image"));

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
  toggleButtonState();
}

function openAdd() {
  openModal(modalAdd);
  renderPhotoInput();
}

function closeModal(evt) {
  evt.currentTarget.parentNode.parentNode.classList.add("modal_hidden");
  renderInput();
}

function addCard(data) {
  const cardTemplate = document.querySelector("#facebook__card").content;
  
  // clone the content of the template tag 
  const cardElement = cardTemplate.querySelector('.facebook__card').cloneNode(true);
  cardElement.querySelector(".facebook__image").src = data.url;
  cardElement.querySelector(".facebook__image").alt = data.name;
  cardElement.querySelector(".facebook__name").textContent = data.name;
  cardElement.querySelector(".facebook__delete").addEventListener("click",deleteCard);
  cardElement.querySelector(".facebook__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("facebook__like_liked");
  });

  return cardElement;
}

function renderCard(card) {
  facebook.prepend(card); 
}

function saveChanges(evt) {
  evt.preventDefault();

  if(evt.currentTarget.classList.contains("modal__content-edit")) {
    let newName = document.querySelector(".modal__input_type_name");
    let newActivity = document.querySelector(".modal__input_type_whois");
  
    userName.innerText = newName.value;
    userActivity.innerText = newActivity.value;
  }

  if(evt.currentTarget.classList.contains("modal__content-add")) {
    let url = document.querySelector(".modal__input_type_url").value;
    let title = document.querySelector(".modal__input_type_title").value;
    renderCard(addCard({url: url, name: title}));
  }

  closeModal();
}

function toggleButtonState() {
  if (modalName.value === "" || modalActivity.value === "") {
    buttonSave.disabled = true;
    buttonSave.classList.add("modal__button-save_disabled");
  } else {
    buttonSave.disabled = false;
    buttonSave.classList.remove("modal__button-save_disabled");
  }
}

function renderPhotoInput() {
  if (modalAddUrl.value === "" || modalAddTitle.value === "") {
    buttonSavePhoto.disabled = true;
    buttonSavePhoto.classList.add("modal__button-save_disabled");
  } else {
    buttonSavePhoto.disabled = false;
    buttonSavePhoto.classList.remove("modal__button-save_disabled");
  }
}

function saveInput() {
  modalName.value = document.querySelector(".info__name").innerText;
  modalActivity.value = document.querySelector(".info__whois").innerText;
}

buttonEdit.addEventListener("click", openEdit);
buttonAdd.addEventListener("click", openAdd);
modalFormList.forEach(modal => {
  modal.addEventListener("submit", saveChanges)
});
buttonCloseList.forEach(button => {
  button.addEventListener("click", closeModal);
});
buttonSavePhoto.addEventListener("click", addCard)

images.forEach(img => {
  img.addEventListener("click",openImage)
})

modalName.addEventListener("input", toggleButtonState);
modalActivity.addEventListener("input", toggleButtonState);

modalAddTitle.addEventListener("input", renderPhotoInput);
modalAddUrl.addEventListener("input", renderPhotoInput);