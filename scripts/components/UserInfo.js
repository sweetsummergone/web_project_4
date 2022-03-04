export default class UserInfo {
    constructor({ userName, userJob }, containerSelector) {
        this._userName = userName;
        this._userJob = userJob;
        this._renderer = renderer;

        
        this._container = document.querySelector(containerSelector);
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