import { makeAutoObservable } from 'mobx';

class createData {
  allData = null;
  filteredData = this.allData

  constructor() {
    makeAutoObservable(this);
  }

  loadData(data) {
      this.allData = data;
  }
  filteredData(filter){

  }
  revertFilter(){
    
  }
}

const DataStore = new createData();

export default DataStore;
