export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector(".modal__button-close").addEventListener("click", () => {
            this.close();
        });
        this._popup.querySelector(".modal__overlay").addEventListener("click", () => {
            this.close();
        });
    }

    open() { 
        this._popup.classList.add("modal_active");
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._popup.classList.remove("modal_active");
        document.removeEventListener('keydown', this._handleEscClose); 
    } 
}