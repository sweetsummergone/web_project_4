export default class UserInfo {
    constructor({ userName, userJob, userImage }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userImage = userImage;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent,
            userImage: this._userImage
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.whois;
        this._userImage.src = data.imageUrl;
    }

    setAvatar(url) {
        console.log(url);
        this._userImage.src = url;
    }

    patchUserInfo(data, {group, token}) {
        this.setUserInfo(data);
        fetch(`https://around.nomoreparties.co/v1/${group}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.whois
            })
        }); 
    }
}