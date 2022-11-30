import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
import { TokenUtil } from '../utils/token';

export class createCartStore {
  ctx;
  userCart = null;
  status = '';

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }
  addToCart(id) {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http
      .post('/cart/add', id)
      .then(() => {
        message.success('Item added to cart!');
        this.status = 'success';
      })
      .catch(() => {
        this.status = 'error';
        message.error('Sorry, failed to add');
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
