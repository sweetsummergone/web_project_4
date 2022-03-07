export default class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.whois;
    }
}