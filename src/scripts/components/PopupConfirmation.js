import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popup, deleteFunc, renderer) {
      super(popup);
      this._deleteFunc = deleteFunc;
      this._renderer = renderer;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", (e) => {
        e.preventDefault();
        this._deleteFunc(this._id)
        .then(() => {
            this._renderer();
        });
        this.close();
      });
    }

    open(id, elemIndex) {
        this._elemIndex = elemIndex;
        this._id = id;
        super.open();
    }
}