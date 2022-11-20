import { makeAutoObservable } from "mobx";
import { appConfig } from "../config/appConfig";
import {http} from '../utils/http'

class createData {
  allData = null
  products = null

  constructor() {
    makeAutoObservable(this);
  }
  
  loadData(){
    const  result = http.fetcher(appConfig.apiUrl)
    console.log(result)
  }
}

const DataStore = new createData();

export default DataStore;
