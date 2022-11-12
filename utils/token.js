const  atob = require('atob');

export class TokenUtil {
    static accessToken = null;

    static loadToken() {
        if (typeof window === "undefined") {
            return;
        }

        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            TokenUtil.setAccessToken(accessToken);
        }
    }

    static persistToken() {
        if(TokenUtil.accessToken != null) {
            localStorage.setItem('access_token', TokenUtil.accessToken);
        } else {
            localStorage.removeItem('access_token');
        }

    }

    static setAccessToken(accessToken) {
        TokenUtil.accessToken = accessToken;
    }

    static clearAccessToken() {
        TokenUtil.accessToken = null;
    }

    static decodedToken() {
        return JSON.parse(atob(TokenUtil.accessToken.split('.')[1]));
    }
}

export const initLocalStorage = () => {
    if (typeof window === "undefined") {
        return {
            getItem: () => {}
        }
    } else {
        return window.localStorage
    }
}