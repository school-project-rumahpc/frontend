import { message, notification } from 'antd';
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

  notify(message,type) {
    return notification[type]({
      description: message,
      duration: 0,
      placement: 'topLeft',
      style: { width: 550 },
    });
  }
  loadAllOrders(query) {
    this.status = 'pending';
    http
      .get('/order')
      .query(query)
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
  }
  approveOrder(orderId) {
    this.status = 'action';
    http
      .patch('/order/accept', { order_id: orderId })
      .then(() => {
        this.status = 'success';
        this.notify(`Order ${orderId} accepted!`,'success');
        this.loadAllOrders({ deleted: false });
      })
      .catch(({ response }) => console.log(response.body));
  }
  rejectOrder(orderId) {
    this.status = 'action';
    http
      .patch('/order/reject', { order_id: orderId })
      .then(() => {
        this.status = 'success';
        this.notify(`Order ${orderId} rejected`,'warning');
        this.loadAllOrders({ deleted: false });
      })
      .catch(({ response }) => console.log(response.body));
  }
}
