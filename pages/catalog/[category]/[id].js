import { Button, Card, Col, Layout, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../../components/bar/navbar';
import { Err, Loading } from '../../../components/loadingAndErr';
import { useStore } from '../../../components/storeContext';
import { Custom } from '../../../utils/custom';
const { Content } = Layout;

const Product = () => {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    store.loadData();
    store.loadItem(router.query.id);
  }, [store,router.isReady]);
  
  if (store.status === 'pending') {
    return <Loading />;
  }
  //if no data
  if (store.status === 'error' && !store.item) {
    return <Err id={router.query.id} />;
  }

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#009867' }}>
      <Navbar />
      <Content style={Custom.contentStyle}>
        <Layout style={{ height: '100%' }}>
          <Row align={'middle'} style={{ height: '100%' }} justify={'center'}>
            <Col>
              <Card
                style={{
                  borderRadius: '40px',
                  margin: '0 50px',
                }}
                cover={
                  <img
                    alt='photo'
                    src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                    width={300}
                    height={375}
                  />
                }
              >
                <Card.Meta
                  style={{ justifyContent: 'right' }}
                  description={<Button type='primary'>Add to cart</Button>}
                />
              </Card>
            </Col>
            <Col
              flex={'auto'}
              style={{
                marginTop: '200px',
                marginBottom: 'auto',
                backgroundColor: '#f8f8f8',
              }}
            >
              <h1>{store.item.product_name}</h1>
            </Col>
          </Row>
        </Layout>
      </Content>
    </Layout>
  );
};

export default observer(Product);
