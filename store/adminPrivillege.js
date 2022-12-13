import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';

export class createAdminPrivillege {
  ctx;
  filteredOrders;
  allOrders;
  status;

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }

  loadAllOrders(query) {
    this.status = 'pending';
    http
      .get('/order')
      .query({ deleted: query.deleted, payment: query.payment })
      .then(({ body }) => {
        this.allOrders = body;
        this.filteredOrders = this.allOrders;
        this.status = 'success';
      })
      .catch(({ response }) => console.log(response));
  }
  filterOrders(status) {
    this.filteredOrders = this.allOrders;
    if (status === 'All') return;
    this.filteredOrders = this.filteredOrders.filter(
      (order) => order.status == status
    );
    console.log({
      all: this.allOrders,
      filter: this.filteredOrders,
    });
  }
  approveOrder(orderId) {
    this.status = 'action';
    http
      .patch('/order/accept', {id:orderId})
      .then(({ body }) => {
        this.status = 'success';
        console.log(body);
        this.loadAllOrders({deleted:'false'})
      })
      .catch(({ response }) => console.log(response.body));
  }
}
