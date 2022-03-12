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
    }

    setAvatar(url) {
        this._userImage.src = url;
    }
}