export default class UserInfo {
    constructor({ userName, userJob, userImage, _id }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userImage = userImage;
        this._id = _id;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent,
            userImage: this._userImage,
            _id: this._id
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
        this._userImage.src = avatar;
        this._id = _id;
    }

    setAvatar(url) {
        this._userImage.src = url;
    }
}