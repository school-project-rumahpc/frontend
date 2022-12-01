import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
import { TokenUtil } from '../utils/token';

export class createCartStore {
  ctx;
  userCart = null;
  status= '';

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  removeFromCart(id){
    console.log(id)
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http
      .del('/cart/remove', id)
      .then(() => {
        this.loadCart()
        this.status = 'success';
      })
      .catch(({}) => {
        this.status = 'errDone';
        message.error(`Failed to remove`);
      });
  }
  addToCart(id) {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http
      .post('/cart/add', id)
      .then(() => {
        this.loadCart()
        message.success('Success',1)
        this.status = 'success';
      })
      .catch(() => {
        this.status = 'errDone';
        message.error(`insufficient stock`);
      });
  }
  loadCart() {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http
      .get('/user/carts')
      .then(({ body }) => {
        this.userCart = body;
        this.status = 'success';
      })
      .catch(() => {
        this.status = 'error';
        message.error('Snap! Something went wrong');
      });
  }
}
