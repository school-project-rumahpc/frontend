import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
import { TokenUtil } from '../utils/token';

export class createCartStore {
  ctx;
  userCart = null;
  status;

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  checkout(){
    this.status = 'pending';
    if(this.userCart.length === 0)return( message.warning('Cart is empty', 2),this.status = 'errDone')
    http.post('/order')
    .then(() => {
      this.loadCart();
      message.success('Checkout success',5)
      this.status = 'success';
    })
    .catch(() => {
      this.status = 'errDone';
      message.error(`Oops! Something went wrong`);
    });
  }
  removeFromCart(id) {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http
      .del('/cart/remove', id)
      .then(() => {
        this.loadCart();
        message.success('succes',0.5)
        this.status = 'success';
      })
      .catch(() => {
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
        this.loadCart();
        message.success('succes',0.5)
        this.status = 'success';
      })
      .catch(({response}) => {
        console.log(response)
        this.status = 'errDone';
        message.error(response.body?.message);
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
