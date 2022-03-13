export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Error: ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    updateUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.whois
            })
        })
        
        .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        
        .then(this._checkResponse);
    }

    saveCard({title, url}) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: title,
            link: url
          })
        })
        
        .then(this._checkResponse);
      }
      
    deleteCard = (id) => {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        
        .then(this._checkResponse);
    }

    addLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
        
        .then(this._checkResponse);
    }

    removeLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        
        .then(this._checkResponse);
    }

    updateAvatar = (url) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
        
        .then(this._checkResponse);
    }

    getAppData() {
        return Promise.all([this.getUser(), this.getCards()]);
    }
}