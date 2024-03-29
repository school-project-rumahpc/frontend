import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
export class createCheckoutStore {
  ctx;
  userCheckout;
  checkoutDetails;
  status = 'pending';

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  loadCheckoutDetails(orderId) {
    this.status = 'pending';
    http
      .get(`/order/${orderId}`)
      .then(({ body }) => {
        this.checkoutDetails = body;
        this.status = 'successDetails';
      })
      .catch(({response}) => {
        message.error(response.body.message);
        this.status = 'error';
      });
  }
  loadCheckout() {
    this.status = 'pending';
    http
      .get('/user/orders')
      .then(({ body }) => {
        this.userCheckout = body;
        this.status = 'success';
      })
      .catch(({response}) => {
        message.error(response.body.message);
        this.status = 'error';
      });
  }
}
