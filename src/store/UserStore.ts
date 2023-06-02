import { makeAutoObservable } from 'mobx';

export default class UserStore {
    _isAuth: boolean;

    constructor() {
        this._isAuth = false;
        makeAutoObservable(this);
    }

    setIsAuth(boolean: boolean) {
        this._isAuth = boolean;
    }

    get isAuth() {
        return this._isAuth;
    }
}