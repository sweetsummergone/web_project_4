let buttonEdit = document.querySelector(".info__button-edit");
let buttonClose = document.querySelector(".modal__button-close");
let buttonSave = document.querySelector(".modal__button-save");
let buttonsLike = document.querySelectorAll(".facebook__like");
let modalElement = document.querySelector(".modal");
let modalForm = document.querySelector(".modal__content");
let userName = document.querySelector(".info__name");
let userActivity = document.querySelector(".info__whois");
let modalName = document.querySelector(".modal__input-name");
let modalActivity = document.querySelector(".modal__input-whois");

function toggleLike(event) {
  event.currentTarget.classList.toggle("facebook__like_liked");
}

function toggleModal() {
  modalElement.classList.toggle("modal_hidden");
  renderInput();
}

function saveChanges(evt) {
  evt.preventDefault();
  let newName = document.querySelector(".modal__input-name");
  let newActivity = document.querySelector(".modal__input-whois");

  if (newName.value !== "" && newActivity.value !== "") {
    userName.innerText = newName.value;
    userActivity.innerText = newActivity.value;
  }
  toggleModal();
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

buttonEdit.addEventListener("click", toggleModal);
buttonClose.addEventListener("click", toggleModal);
modalForm.addEventListener("submit", saveChanges);

modalName.addEventListener("input", renderInput);
modalActivity.addEventListener("input", renderInput);

for (let i = 0; i < buttonsLike.length; i++) {
  let button = buttonsLike[i];
  button.addEventListener("click", toggleLike, false);
}
