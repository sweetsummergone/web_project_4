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
        });
    }

    getCards() {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards`, {
            headers: {
                authorization: this._token 
            }
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
        });
      }
      
    deleteCard = (id) => {
        return fetch(`https://around.nomoreparties.co/v1/${this._group}/cards/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              authorization: this._token 
            }
        });
    }
}