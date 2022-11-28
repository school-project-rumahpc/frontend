import { makeAutoObservable } from "mobx"
import { http } from "../utils/http"
import { TokenUtil } from "../utils/token"

export class createCartStore {
    ctx
    userCart

    constructor(ctx){
        makeAutoObservable(this)
        this.ctx = ctx
    }

    loadCart(){
        TokenUtil.loadToken()
        console.log(TokenUtil.accessToken)
    }
}