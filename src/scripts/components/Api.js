export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Error: ${res.status}`);
        });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        }); 
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
      }
      
    deleteCard = (id) => {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    addLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    removeLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    updateAvatar = (url) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    awaitPromises() {
        return Promise.all([this.getUser, this.getCards]);
    }
}