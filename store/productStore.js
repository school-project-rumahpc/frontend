import { makeAutoObservable } from "mobx";

class createProductStore{
    dataList='default value';
    

    loadData(data){
        this.dataList = data
    }
    constructor(){
        makeAutoObservable(this)
    }
}

const ProductStore = new createProductStore()

export default ProductStore