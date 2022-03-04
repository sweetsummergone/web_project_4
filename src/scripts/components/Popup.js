export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._isOpen = false;
    }

    _handleEscClose() {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.classList.closest(".modal__button-close").addEventListener("click", () => {
            this.close();
        });
        this._popupSelector.classList.closest(".modal__overlay").addEventListener("click", () => {
            this.close();
        })
    }

    open() {
        this._isOpen = true;
    }

    close() {
        this._isOpen = false;
    } 
}