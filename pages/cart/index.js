import { useStore } from '../../components/storeContext';
import { useEffect } from 'react';
import { Loading } from '../../components/loadingAndErr';
import { observer } from 'mobx-react-lite';
import { Col, Layout, Row } from 'antd';

const Cart = () => {
  const { cartStore } = useStore();
  useEffect(() => {
    cartStore.loadCart();
    console.log(cartStore);
  }, []);

  if (cartStore.status === 'pending') return <Loading />;

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#009867' }}>
      <Layout.Content>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default observer(Cart);
