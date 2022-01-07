let buttonEdit = document.querySelector(".info__button-edit");
let buttonAdd = document.querySelector(".profile__button-add");
let buttonClose = Array.from(document.querySelectorAll(".modal__button-close"));
let buttonSave = document.querySelector(".modal__button-save");
let buttonSavePhoto = document.querySelector(".modal__button-save-photo");
let modal = Array.from(document.querySelectorAll(".modal"));
let modalEdit = document.querySelector(".modal_edit");
let modalAdd = document.querySelector(".modal_add");
let modalForm = Array.from(document.querySelectorAll(".modal__content"));
let userName = document.querySelector(".info__name");
let userActivity = document.querySelector(".info__whois");
let modalName = document.querySelector(".modal__input_type_name");
let modalActivity = document.querySelector(".modal__input_type_whois");
let modalAddTitle = document.querySelector(".modal__input_type_title");
let modalAddUrl = document.querySelector(".modal__input_type_url");

const facebook = document.querySelector(".facebook");
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
  addCard(card.link,card.name,"append");
});

let buttonDelete = Array.from(document.querySelectorAll(".facebook__delete"));
let images = Array.from(document.querySelectorAll(".facebook__image"));

function deleteCard(evt){
  evt.currentTarget.parentNode.remove();
}

function openImage(evt) {
  // const modalPopup = document.querySelector("#modal_popup").content;

  // const popupElement = modalPopup.querySelector('.modal_popup').cloneNode(true);

  let modalPopup = document.querySelector(".modal_popup");
  let modalImage = document.querySelector(".popup__image");
  let modalTitle = document.querySelector(".popup__title");
  modalImage.src = evt.currentTarget.src
  modalTitle.textContent = evt.currentTarget.alt;
  modalPopup.classList.toggle("modal_hidden");
}

function openEdit() {
  modalEdit.classList.remove("modal_hidden");
  modalName.value = userName.textContent;
  modalActivity.value = userActivity.textContent;
  renderInput();
}

function openAdd() {
  modalAdd.classList.remove("modal_hidden");
  renderPhotoInput();
}

function closeModal() {
  modal.forEach(item => {
    item.classList.add("modal_hidden");
  })
  renderInput();
}

function addCard(url,name,position) {
  const cardTemplate = document.querySelector("#facebook__card").content;
  
  // clone the content of the template tag 
  const cardElement = cardTemplate.querySelector('.facebook__card').cloneNode(true);
  cardElement.querySelector(".facebook__image").src = url;
  cardElement.querySelector(".facebook__image").alt = name;
  cardElement.querySelector(".facebook__name").textContent = name;
  
  cardElement.querySelector(".facebook__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("facebook__like_liked");
  });
  // make it appear on the page
  switch(position) {
    case "append":
      facebook.append(cardElement);    
      break;
    case "prepend":
      facebook.prepend(cardElement); 
      break;
  }
}

function saveChanges(evt) {
  evt.preventDefault();
  if(evt.currentTarget.classList.contains("modal__content-edit")) {
    let newName = document.querySelector(".modal__input_type_name");
    let newActivity = document.querySelector(".modal__input_type_whois");
  
    if (newName.value !== "" && newActivity.value !== "") {
      userName.innerText = newName.value;
      userActivity.innerText = newActivity.value;
    }
  }
  if(evt.currentTarget.classList.contains("modal__content-add")) {
    let url = document.querySelector(".modal__input_type_url").value;
    let title = document.querySelector(".modal__input_type_title").value;
    if (url !== "" && title !== "") {
      addCard(url,title,"prepend")
    }
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
modalForm.forEach(modal => {
  modal.addEventListener("submit", saveChanges)
});
buttonClose.forEach(button => {
  button.addEventListener("click", closeModal);
});
buttonSavePhoto.addEventListener("click", addCard)
buttonDelete.forEach(button => {
  button.addEventListener("click",deleteCard);
})


images.forEach(img => {
  img.addEventListener("click",openImage)
})

modalName.addEventListener("input", renderInput);
modalActivity.addEventListener("input", renderInput);

modalAddTitle.addEventListener("input", renderPhotoInput);
modalAddUrl.addEventListener("input", renderPhotoInput);