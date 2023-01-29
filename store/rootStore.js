import { createCartStore } from "./cartStore"
import { createCheckoutStore } from "./checkoutStore"
import { createProductStore } from "./productStore"
import { createAdminPrivillege } from "./adminPrivillege"

class createRootStore {
    productStore
    cartStore
    checkoutStore
    adminPrivillege

    constructor(){
        this.productStore = new createProductStore(this)
        this.cartStore = new createCartStore(this)
        this.checkoutStore = new createCheckoutStore(this)
        this.adminPrivillege = new createAdminPrivillege(this)
    }
}
const RootStore = new createRootStore()
export default RootStore