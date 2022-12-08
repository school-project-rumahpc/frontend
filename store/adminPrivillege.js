import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';

export class createAdminPrivillege {
  ctx;
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
      .query({ deleted: query })
      .then(({ body }) => {
        this.allOrders = body;
        this.status = 'success';
      })
      .catch(({ response }) => console.log(response));
  }
}
