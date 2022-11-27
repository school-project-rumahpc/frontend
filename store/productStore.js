import { configure, makeAutoObservable } from "mobx";
import { http } from "../utils/http";
configure({
  enforceActions: "never",
});
export class createProductStore {
  ctx;
  allProducts = null;
  item = null;
  filteredData = null;
  status = "pending";

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }

  loadData() {
    if (!this.allProducts) {
      this.status = "pending";
      http
        .get("/category")
        .then(({ body }) => {
          this.allProducts = body;
          this.filteredData = this.allProducts;
          this.status = "success";
        })
        .catch(() => {
          this.status = "error";
        });
    }
  }
  loadItem(id) {
    this.item = null;
    this.status = "pending";
    if (!this.item) {
      http
        .get(`/product/${id}`)
        .then(({ body }) => {
          this.item = body;
          this.status = "success";
        })
        .catch(() => {
          this.status = "error";
        });
    }
  }
  filterData(category) {
    this.filteredData = this.allProducts;
    if (category) {
      this.filteredData = this.filteredData.filter(
        (e) => e.category_name === category
      );
    }
  }
}
