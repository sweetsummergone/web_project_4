let buttonEdit = document.querySelector(".info__button-edit");
let buttonClose = document.querySelector(".modal__button-close");
let buttonSave = document.querySelector(".modal__button-save");
let buttonsLike = document.querySelectorAll(".facebook__like");
let modalElement = document.querySelector(".modal");

function toggleLike(event) {
  event.currentTarget.classList.toggle("facebook__like-liked");
}

function toggleModal() {
  modalElement.classList.toggle("modal__hidden");
}

function saveChanges() {
  let name = document.querySelector(".info__name");
  let activity = document.querySelector(".info__whois");
  let newName = document.querySelector(".modal__name");
  let newActivity = document.querySelector(".modal__whois");

  if (
    newName.value !== "" &&
    newActivity.value !== "" &&
    newName.value.length < 24 &&
    newActivity.value.length < 32
  ) {
    name.innerText = newName.value;
    activity.innerText = newActivity.value;
  }
}

buttonEdit.addEventListener("click", toggleModal);
buttonClose.addEventListener("click", toggleModal);
buttonSave.addEventListener("click", saveChanges);

for (let i = 0; i < buttonsLike.length; i++) {
  let button = buttonsLike[i];
  button.addEventListener("click", toggleLike, false);
}
