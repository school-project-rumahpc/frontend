import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';

export class createCheckoutStore {
  ctx;
  userCheckout;
  status;

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  loadCheckout() {
    this.status = 'pending';
    http
      .get('/user/orders')
      .then(({ body }) => {
        this.userCheckout = body;
        this.status = 'success';
      })
      .catch(() => {
        message.error('Something went wrong!');
        this.status = 'error';
      });
  }
}
