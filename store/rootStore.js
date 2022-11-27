import { createProductStore } from "./productStore"

class createRootStore {
    productStore

    constructor(){
        this.productStore = new createProductStore(this)
    }
}
const RootStore = new createRootStore()
export default RootStore