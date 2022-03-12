export default class Api {
    constructor({token, group}) {
        this._token = token;
        this._group = group;
    }
    
    getUser() {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/users/me`, {
            headers: {
                authorization: this._token 
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Error: ${res.status}`);
        });
    }

    updateUser(data) {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
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
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards`, {
            headers: {
                authorization: this._token 
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    saveCard({title, url}) {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            authorization: this._token 
          },
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
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              authorization: this._token 
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    addLike = (cardId) => {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              authorization: this._token 
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    removeLike = (cardId) => {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              authorization: this._token 
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    updateAvatar = (url) => {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token 
            },
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