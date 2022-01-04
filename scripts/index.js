let buttonEdit = document.querySelector(".info__button-edit");
let buttonClose = document.querySelector(".modal__button-close");
let buttonSave = document.querySelector(".modal__button-save");
let buttonsLike = document.querySelectorAll(".facebook__like");
let modalElement = document.querySelector(".modal");
let modalForm = document.querySelector(".modal__content");
let userName = document.querySelector(".info__name");
let userActivity = document.querySelector(".info__whois");
let modalName = document.querySelector(".modal__input_type_name");
let modalActivity = document.querySelector(".modal__input_type_whois");

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

const facebook = document.querySelector(".facebook");

// add content
initialCards.forEach(card => {
  const cardTemplate = document.querySelector("#facebook__card").content;
  
  // clone the content of the template tag 
  const cardElement = cardTemplate.querySelector('.facebook__card').cloneNode(true);
  cardElement.querySelector(".facebook__image").src = card.link;
  cardElement.querySelector(".facebook__name").textContent = card.name;

  // make it appear on the page
  facebook.append(cardElement); 
});

function toggleLike(event) {
  event.currentTarget.classList.toggle("facebook__like_liked");
}

function openModal() {
  modalElement.classList.remove("modal_hidden");
  modalName.value = userName.textContent;
  modalActivity.value = userActivity.textContent;
  renderInput();
}

function closeModal() {
  modalElement.classList.add("modal_hidden");
  renderInput();
}

function saveChanges(evt) {
  evt.preventDefault();
  let newName = document.querySelector(".modal__input_type_name");
  let newActivity = document.querySelector(".modal__input_type_whois");

  if (newName.value !== "" && newActivity.value !== "") {
    userName.innerText = newName.value;
    userActivity.innerText = newActivity.value;
  }
  closeModal();
}

function renderInput() {
  if (modalName.value === "" || modalActivity.value === "") {
    buttonSave.disabled = true;
    buttonSave.classList.add("modal__button-save_disabled");
  } else {
    buttonSave.disabled = false;
    buttonSave.classList.remove("modal__button-save_disabled");
  }
}

function saveInput() {
  modalName.value = document.querySelector(".info__name").innerText;
  modalActivity.value = document.querySelector(".info__whois").innerText;
}

buttonEdit.addEventListener("click", openModal);
buttonClose.addEventListener("click", closeModal);
modalForm.addEventListener("submit", saveChanges);

modalName.addEventListener("input", renderInput);
modalActivity.addEventListener("input", renderInput);

for (let i = 0; i < buttonsLike.length; i++) {
  let button = buttonsLike[i];
  button.addEventListener("click", toggleLike, false);
}
