import { configure, makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
configure({
  enforceActions: 'never',
});
class createData {
  allData = null;
  item = null;
  filteredData = null;
  status = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  loadData() {
    if (!this.allData) {
      this.status = 'pending';
      http
        .get('/category')
        .then(({ body }) => {
          this.allData = body;
          this.filteredData = this.allData;
          this.status = 'success';
        })
        .catch(() => {
          this.status = 'error';
        });
    }
  }
  loadItem(id) {
    this.status = 'pending';
    http
      .get(`/product/${id}`)
      .then(({ body }) => {
        this.item = body;
        console.log(this.item);
        this.status = 'success';
      })
      .catch(() => {
        this.status = 'error';
        console.log(this.status)
      });
  }
  filterData(category) {
    this.filteredData = this.allData;
    if (category) {
      this.filteredData = this.filteredData.filter(
        (e) => e.category_name === category
      );
    }
  }
}

const DataStore = new createData();

export default DataStore;
