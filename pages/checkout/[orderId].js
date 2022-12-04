import { Col, Divider, Row, Statistic } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loading } from '../../components/loadingAndErr';
import { useStore } from '../../components/storeContext';
import { statusColor } from '../../utils/custom';
import { formatPrice } from '../../utils/priceFormat';

// TODO: UPLOAD PHOTO TO DATABASE
const ItemsDisplay = ({ items }) => {
  return items.map(({ id, quantity, item, subTotal }) => {
    return (
      <Row
        key={id}
        style={{ width: '600px', textAlign: 'end' }}
        justify='space-between'
      >
        <Col span={15}>
          <h3>{item.name}</h3>
        </Col>
        <Col span={3}>
          <h3>{quantity}x</h3>
        </Col>
        <Col span={6}>
          <h4>{formatPrice(subTotal)}</h4>
        </Col>
      </Row>
    );
  });
};

const OrderDetailsDisplay = ({ checkoutDetails }) => {
  const { deadline, status, items, totalPrice } = checkoutDetails;
  return (
    <>
      {deadline && (
        <Row justify={'center'}>
          <h3 style={{ color: '#FF2F2F' }}>{deadline}</h3>
          <Divider />
        </Row>
      )}
      <Row justify={'space-between'}>
        <Col>
          <h2>Status :</h2>
        </Col>
        <Col>
          <h2 style={{ color: statusColor(status) }}>{status}</h2>
        </Col>
        <Divider />
      </Row>
      <Row align={'middle'} justify='space-between'>
        <Col>
          <h2>Items</h2>
        </Col>
        <Col>
          <ItemsDisplay items={items} />
        </Col>
        <Divider />
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <h2>Total</h2>
          <sup>please pay the exact amount displayed**</sup>
        </Col>
        <Col>
          <h1>{formatPrice(totalPrice)}</h1>
        </Col>
        <Divider/>
      </Row>
      <Row>
        <h2>Proof Of Payment</h2>
      </Row>
    </>
  );
};

const OrderDetails = () => {
  const { checkoutDetails, status } = useCheckOutDetails();
  return (
    <Row
      justify={'center'}
      style={{
        backgroundColor: '#009867',
        minHeight: '100vh',
        maxHeight: '100%',
      }}
    >
      <Col
        style={{
          color:'grey',
          padding: '0 30px',
          boxShadow: '0 0 100px rgba(0, 0, 0, 0.25)',
          borderRadius: '25px',
          margin: '40px 0',
          backgroundColor: '#fff',
          width: '60vw',
        }}
      >
        <Row align={'middle'}>
          <Divider orientation='left' style={{ borderColor: '#009867' }}>
            <h1>Order Details</h1>
          </Divider>
        </Row>
        {status === 'successDetails' ? (
          <OrderDetailsDisplay checkoutDetails={checkoutDetails} />
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
};

export default observer(OrderDetails);

const useCheckOutDetails = () => {
  const { checkoutStore } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) checkoutStore.loadCheckoutDetails(router.query.orderId);
  }, [router.isReady]);
  return checkoutStore;
};
