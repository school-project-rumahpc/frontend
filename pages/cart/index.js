import { ShoppingOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Button, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { Custom } from '../../utils/custom';
import styles from '../../styles/product.module.css';
import { useEffect } from 'react';
import { Err, Loading } from '../../components/loadingAndErr';
import { useStore } from '../../components/storeContext';
import FloatButton from '../../components/floats';
import { formatPrice } from '../../utils/priceFormat';
const { Header, Content } = Layout;
export const greenLine = { borderColor: '#009867' };

const OrderDisplay = ({ cartStore }) => {
  const { userCart } = cartStore;
  let total = 0;
  userCart.map(({ subTotal }) => (total += subTotal));
  return (
    <>
      <Row align='middle'>
        <Divider orientation='left' style={greenLine}>
          <h1>Payment Details</h1>
        </Divider>
      </Row>
      <Row justify='space-between' utter={[20]} style={{ textAlign: 'center' }}>
        <Col style={{ width: '200px' }}>Item Name</Col>
        <Col style={{ width: '80px' }}> QTY </Col>
        <Col style={{ width: '200px' }}> Price </Col>
        <Divider />
      </Row>
      {userCart.map((e) => {
        const { item } = e;
        const price = formatPrice(e.subTotal);
        return (
            <Row
              key={e.id}
              justify='space-between'
              gutter={[20]}
              style={{ textAlign: 'center' }}
            >
              <Col style={{ width: '200px' }}> {item.name}</Col>
              <Col style={{ width: '80px' }}> {e.quantity}</Col>
              <Col style={{ width: '200px' }}>{price}</Col>
            <Divider key={e.id + '-divider'} />
            </Row>
        );
      })}
      <Row align='middle' style={{ paddingBottom: '30px' }}>
        <Divider style={greenLine} orientation='left'>
          <h3>Total</h3>
        </Divider>
        <h1>{formatPrice(total)}</h1>
        <Button
          block
          type='primary'
          disabled={cartStore.status === 'pending' ? true : false}
          loading={cartStore.status === 'pending' ? true : false}
          onClick={() => cartStore.checkout()}
        >
          Checkout
        </Button>
      </Row>
    </>
  );
};

const CartDisplay = ({ cartStore }) => {
  const { userCart } = cartStore;
  return userCart.map((cartItem) => {
    const { item,subTotal } = cartItem;
    return (
      <Row
        key={cartItem.id}
        align='middle'
        style={{
          padding: '0 25px',
          borderBottom: '2px solid grey',
          height: '200px',
          gap: '25px',
        }}
      >
        <Col
          className={styles.cart}
          style={{
            height: '170px',
            width: '155px',
            borderRadius: '25px',
          }}
        >
          <Image
            style={{ ...Custom.loadingGif, borderRadius: '25px' }}
            alt={item.name}
            src={item.images[0]}
            layout='fill'
            loading='lazy'
          />
        </Col>
        <Col>
          <Row>
            <h1 style={{ color: 'black' }}>{formatPrice(item.price)}</h1>
          </Row>
          <Row>
            <p style={{ color: 'black' }}>
              Subtotal :&nbsp;
              {formatPrice(subTotal)}
            </p>
          </Row>
          <Row>
            <h3>{item.name}</h3>
          </Row>
          <Row gutter={[20]} align='middle'>
            <Col>
              <Button
                disabled={cartStore.status === 'pending' ? true : false}
                onClick={() =>
                  cartStore.removeFromCart({ product_id: item.id })
                }
                size='regular'
              >
                -
              </Button>
            </Col>
            <Col>
              <h2>{cartItem.quantity}</h2>
            </Col>
            <Col>
              <Button
                disabled={cartStore.status === 'pending' ? true : false}
                onClick={() => cartStore.addToCart({ product_id: item.id })}
                size='regular'
              >
                +
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });
};

const Cart = () => {
  const { cartStore } = useStore();
  const colStyle = {
    minWidth: '600px',
    width: '40vw',
    maxHeight: '100%',
    backgroundColor: '#fff',
  };
  useEffect(() => {
    cartStore.loadCart();
  }, []);

  if (cartStore.status === 'error') return <Err />;

  return (
    <>
      <Row
        justify='center'
        style={{ gap: '50px', height: '100%', backgroundColor: '#009867' }}
      >
        <Col style={{ ...colStyle, height: '100vh' }}>
          <Layout style={{ overflowY: 'auto' }}>
            <Header
              style={{ borderBottom: '3px solid #009867', height: '100px' }}
            >
              <Row
                align='middle'
                justify='space-between'
                style={{ height: '100px', padding: '0 20px' }}
              >
                <Col>
                  <Link href={'/catalog'}>
                    <a>
                      <Image
                        src={'/logo.svg'}
                        width={121}
                        height={84}
                        alt='Logo'
                        priority
                      />
                    </a>
                  </Link>
                </Col>
                <Col>
                  <h1>Cart</h1>
                </Col>
              </Row>
            </Header>
            <Content style={{ height: 'calc(100vh - 100px)' }}>
              {cartStore.userCart ? (
                <CartDisplay cartStore={cartStore} />
              ) : (
                <Loading />
              )}
            </Content>
          </Layout>
        </Col>
        <Col
          style={{
            ...colStyle,
            borderRadius: '25px',
            margin: 'auto 0',
            padding: '0 30px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {cartStore.userCart ? (
            <OrderDisplay cartStore={cartStore} />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
      <FloatButton href={'/checkout'} Icon={ShoppingOutlined} />
    </>
  );
};

export default observer(Cart);
