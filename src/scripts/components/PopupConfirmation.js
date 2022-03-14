import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popup, deleteFunc) {
      super(popup);
      this._deleteFunc = deleteFunc;
      this._buttonSave = this._popup.querySelector(".modal__button-save");
    }

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", (e) => {
        e.preventDefault();
        this._buttonSave.textContent = "Deleting...";
        this._deleteFunc(this._id)
        .then(() => {  
          this.close();
        })
        .finally(() => {
          this._buttonSave.textContent = "Yes";
        });
      });
    }

    open(id) {
        this._id = id;
        super.open();
    }
}