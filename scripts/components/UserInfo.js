export default class UserInfo {
    constructor({userName, userJob}) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        return {
            userName,
            userJob
        }
    }

    setUserInfo(data) {
        this._userName = data.userName;
        this._userJob = data.userJob;
    }
}