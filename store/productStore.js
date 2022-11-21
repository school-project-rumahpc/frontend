import { configure, makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
configure
class createData {
  allData = null;
  filteredData = null;
  status = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  loadData() {
    this.status = 'pending';
    http
      .get()
      .then(({ body }) => {
        this.allData = body;
        this.filteredData = this.allData;
        this.status = 'done';
      })
      .catch(() => {
        this.status = 'error';
      });
  }
  filterData(filter) {
    this.filteredData = this.allData;
    if (filter) {
      this.filteredData = this.filteredData.filter(
        (e) => e.category_name === filter
      );
    }
  }
}

const DataStore = new createData();

export default DataStore;
