let buttonEdit = document.querySelector(".info__button-edit");
let buttonClose = document.querySelector(".modal__button-close");
let buttonSave = document.querySelector(".modal__button-save");
let buttonsLike = document.querySelectorAll(".facebook__like");
let modalElement = document.querySelector(".modal");

let modalName = document.querySelector(".modal__name");
let modalActivity = document.querySelector(".modal__whois");

function toggleLike(event) {
  event.currentTarget.classList.toggle("facebook__like_liked");
}

function toggleModal() {
  modalElement.classList.toggle("modal__hidden");
  renderInput();
}

function saveChanges() {
  let name = document.querySelector(".info__name");
  let activity = document.querySelector(".info__whois");
  let newName = document.querySelector(".modal__name");
  let newActivity = document.querySelector(".modal__whois");

  if (newName.value !== "" && newActivity.value !== "") {
    name.innerText = newName.value;
    activity.innerText = newActivity.value;
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
buttonSave.addEventListener("click", saveChanges);

modalName.addEventListener("input", renderInput);
modalActivity.addEventListener("input", renderInput);

for (let i = 0; i < buttonsLike.length; i++) {
  let button = buttonsLike[i];
  button.addEventListener("click", toggleLike, false);
}
