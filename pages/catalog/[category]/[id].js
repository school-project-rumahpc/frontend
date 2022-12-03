import { Button, Card, Col, Layout, notification, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../../components/bar/navbar';
import { Err, Loading } from '../../../components/loadingAndErr';
import { useStore } from '../../../components/storeContext';
import { Custom } from '../../../utils/custom';
import { formatPrice } from '../../../utils/priceFormat';
import { TokenUtil } from '../../../utils/token';
const { Title } = Typography;
const { Content } = Layout;

TokenUtil.loadToken();

const DetailDisplay = ({ item }) => {
  const { details } = item;
  let detailArr = [];
  for (let detailKey in details) {
    detailArr = [...detailArr, `${detailKey} : ${details[detailKey]}`];
  }
  return (
    <>
      {detailArr.map((i) => (
        <p key={i}>{i.indexOf('null') < 0 ? i : null}</p>
      ))}
    </>
  );
};

const ProductDisplay = observer(({ productStore, cat, cartStore }) => {
  const { item } = productStore;
  const capitalize = { textTransform: 'capitalize' };
  return (
    <>
      <Col>
        <Card
          style={{
            backgroundColor: cat === 'Laptop' ? '#373737' : null,
            minWidth: '250px',
          }}
          cover={
            <Image
              style={Custom.loadingGif}
              alt='photo'
              src={item.images[0]}
              width={300}
              height={375}
              loading='lazy'
            />
          }
        >
          <Card.Meta
            style={{ justifyContent: 'right', padding: '0 0 20px 0' }}
            title={
              <Button
                loading={cartStore.status === 'pending' ? true : false}
                onClick={() => cartStore.addToCart({ product_id: item.id })}
                size='middle'
                type='primary'
                disabled={!TokenUtil.accessToken || item.stock === 0?true:false}
              >
                {TokenUtil.accessToken ? 'Add to cart' : 'Please login!'}
              </Button>
            }
          />
        </Card>
      </Col>
      <Col flex={'auto'}>
        <Title level={4} style={capitalize}>
          {item.name.toLowerCase()}
        </Title>
        <p style={{ color: 'black' }}>
          {formatPrice(item.price)}
          <br />
          Stock: {item.stock}
        </p>
        <h3>Specification :</h3>
        <DetailDisplay item={item} />
      </Col>
    </>
  );
});

const Product = () => {
  const { productStore, cartStore } = useStore();
  const router = useRouter();
  const cat = router.query.category;
  useEffect(() => {
    productStore.status = 'pending';
    if (router.isReady) {
      productStore.loadItem(router.query.id);
      productStore.loadData();
    }
    if (productStore.item === null) return;
  }, [router.isReady]);
  //if no data
  if (productStore.status === 'error' && !productStore.item) {
    return <Err />;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        maxHeight: '100%',
        backgroundColor: '#009867',
      }}
    >
      <Navbar />
      {/*FIXME: FIX DESCRIPTION ON LONG DESCRIPTION  */}
      <Content style={Custom.contentStyle}>
        <Row
          style={{ minHeight: 'calc(100vh - 100px)', padding: '30px 30px' }}
          align={'middle'}
          justify={'center'}
          gutter={[50, 50]}
        >
          {productStore.item ? (
            <ProductDisplay
              productStore={productStore}
              cat={cat}
              cartStore={cartStore}
            />
          ) : (
            <Loading />
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default observer(Product);
