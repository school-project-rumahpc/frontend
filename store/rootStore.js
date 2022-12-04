import { createCartStore } from "./cartStore"
import { createCheckoutStore } from "./checkoutStore"
import { createProductStore } from "./productStore"

class createRootStore {
    productStore
    cartStore
    checkoutStore

    constructor(){
        this.productStore = new createProductStore(this)
        this.cartStore = new createCartStore(this)
        this.checkoutStore = new createCheckoutStore(this)
    }
}
const RootStore = new createRootStore()
export default RootStore