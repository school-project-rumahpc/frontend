import { makeAutoObservable } from 'mobx';
import { http } from '../utils/http';
import { TokenUtil } from '../utils/token';

export class createCartStore {
  ctx;
  userCart = null;
  status = 'pending';

  constructor(ctx) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }

  loadCart() {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    this.status = 'pending';
    http.get('/user/carts').then(({ body }) => {
      this.userCart = body;
      this.status = 'success';
    });
  }
}
