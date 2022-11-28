import { createCartStore } from "./cartStore"
import { createProductStore } from "./productStore"

class createRootStore {
    productStore
    cartStore

    constructor(){
        this.productStore = new createProductStore(this)
        this.cartStore = new createCartStore(this)
    }
}
const RootStore = new createRootStore()
export default RootStore