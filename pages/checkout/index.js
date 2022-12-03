import { Button, Col, Divider, Layout, Row } from 'antd';
import { Err, Loading } from '../../components/loadingAndErr';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../components/storeContext';
import { greenLine } from '../cart';
import { useRouter } from 'next/router';
import FloatButton from '../../components/floats';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utils/priceFormat';
const { Content, Header } = Layout;

const statusColor = (status) => {
  switch (status) {
    case 'Waiting':
      return '#221E1F';
    case 'Pending':
      return '#C3963F';
    default:
      return '#009867';
  }
};

//TODO: Itemlist details
const ItemDisplay = ({ items }) => {
  return items.map(({ item, quantity, subTotal, id }) => {
    const price = formatPrice(subTotal);
    return (
      <li key={id} style={{ listStyle: 'initial' }}>
        <Row justify={'space-between'} key={id}>
          <Col span={12}>{item.name}</Col>
          <Col span={6}>{price}</Col>
          <Col span={3} style={{textAlign:'end'}}>QTY : {quantity}</Col>
        </Row>
      </li>
    );
  });
};

const CheckoutDisplay = ({ userCheckout }) => {
  const router = useRouter();
  let num = 0;
  return (
    <Content style={{ padding: '0 20px' }}>
      {userCheckout.map((checkout) => {
        const { status, id, deadline, orderDate, items } = checkout;
        const color = statusColor(status);
        num++;
        return (
          <section key={id}>
            <Row align='middle'>
              <h2>
                {num}. Order status : <b style={{ color: color }}>{status}</b>
              </h2>
            </Row>
            <Row>{deadline && <h3 style={{color:'#FF2F2F'}}> Deadline :{deadline.slice(0, 10)}</h3>}</Row>
            <Row>
              <h4> Order date :{orderDate.slice(0, 10)}</h4>
            </Row>
            <ol>
              <ItemDisplay items={items} />
            </ol>
            <Row style={{marginBottom:'15px'}} justify={'end'}>
              <h2>
                Total :&nbsp;
                {formatPrice(
                  items
                    .map(({ subTotal }) => subTotal)
                    .reduce((prev, curr) => prev + curr, 0)
                )}
              </h2>
            </Row>
            <Row>
              <Button
                block
                type='primary'
                onClick={(e) => router.push(`/checkout/${id}`)}
              >
                Check Details
              </Button>
            </Row>
            <Divider />
          </section>
        );
      })}
    </Content>
  );
};

const Checkout = () => {
  const { userCheckout, status } = useCheckout();

  if (status === 'error') return <Err />;

  return (
    <>
      <Row
        style={{
          backgroundColor: '#009867',
          minHeight: '100vh',
          maxHeight: '100%',
        }}
        justify='center'
        align='top'
      >
        <Layout
          style={{ margin: '0 20%', minHeight: '100vh', maxHeight: '100%' }}
        >
          <Header>
            <Divider orientation='left' style={greenLine}>
              <h1>All Orders</h1>
            </Divider>
          </Header>
          {status === 'success' ? (
            <CheckoutDisplay userCheckout={userCheckout} />
          ) : (
            <Loading />
          )}
        </Layout>
      </Row>
      <FloatButton Icon={ShoppingCartOutlined} href={'/catalog'} />
    </>
  );
};

export default observer(Checkout);

const useCheckout = () => {
  const { checkoutStore } = useStore();
  useEffect(() => {
    checkoutStore.loadCheckout();
  }, []);
  return checkoutStore;
};
