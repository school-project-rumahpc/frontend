import {
  Layout,
  Row,
  Col,
  Button,
  Spin,
  message,
  Segmented,
  Divider,
} from 'antd';
import { Custom, statusColor } from '../../utils/custom';
import { TokenUtil } from '../../utils/token';
import { http } from '../../utils/http';
import { useStore } from '../../components/storeContext';
import { Loading } from '../../components/loadingAndErr';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const { Header, Content } = Layout;

const Unauthorized = () => {
  const router = useRouter();
  router.back();
  return (
    <Row justify='center'>
      <h1>Unauthorized! redirecting back...</h1>
    </Row>
  );
};
//TODO: Try with antd table
const OrdersDisplay = ({ filteredOrders }) => {
  return filteredOrders.map(({ deadline, id, status, totalPrice, user }) => {
    console.log(new Date(deadline?.replace(' ', 'T')).getTime())
    return (
      <Row
        align={'middle'}
        justify={'end'}
        style={{ padding: '0 30px' }}
        key={id}
      >
        <Divider orientation='right'>
          <h1>User - {user.username}</h1>
        </Divider>
        <Col style={{ textAlign: 'end' }}>
          {deadline && <h3 style={{ color: 'red' }}>{deadline}</h3>}
          <h2 style={{ color: statusColor(status) }}>{status}</h2>
          <h4>{user.email}</h4>
          <h4>{user.phone}</h4>
        </Col>
      </Row>
    );
  });
};

const ContentDisplay = observer(({ adminPrivillege }) => {
  const [status, setStatus] = useState('All');
  const Alltatus = [
    'All',
    'Fail',
    'Waiting',
    'Pending',
    'Approved',
    'OnQueue',
    'Finished',
  ];
  const statusLabel = Alltatus.map((status) => {
    return {
      label: (
        <h3 key={status} style={{ color: statusColor(status) }}>
          {status}
        </h3>
      ),
      value: status,
    };
  });
  if (adminPrivillege.status === 'pending') return <Loading />;
  return (
    <>
      <Segmented
        onChange={(status) => {
          adminPrivillege.filterOrders(status);
          setStatus(status);
        }}
        options={statusLabel}
        block
      />
      <Row style={{ padding: '0 30px' }}>
        <h1 style={{ color: statusColor(status) }}>{status} Orders</h1>
      </Row>
      <OrdersDisplay filteredOrders={adminPrivillege.filteredOrders} />
    </>
  );
});

const Admin = () => {
  const router = useRouter();
  const { user, status } = useUser();
  const adminPrivillege = useGet('false');
  if (status !== 'done') return <Spin />;
  if (user.role !== 'admin') return <Unauthorized />;
  if (!user) return;

  const logOut = () => {
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    router.push('/');
    message.success('Logout success');
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        maxHeight: '100%',
        backgroundColor: '#009867',
      }}
    >
      <Header style={{ zIndex: '1' }}>
        <Row
          align='middle'
          justify='space-between'
          style={{
            padding: '0 20px',
            height: '100%',
            boxShadow: ' 0px 2px 5px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Col>
            <h1>Admin Page</h1>
          </Col>
          <Col>
            <Button danger size='large' type='text' onClick={logOut}>
              Log Out
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{...Custom.contentStyle, paddingBottom:'100px'}}>
        <ContentDisplay adminPrivillege={adminPrivillege} />
      </Content>
    </Layout>
  );
};

export default Admin;

const useUser = () => {
  const [status, setStatus] = useState('pending');
  const [user, setUser] = useState();
  useEffect(() => {
    setStatus('pending');
    http
      .get('/auth/user')
      .then(({ body }) => {
        setStatus('done');
        setUser(body);
      })
      .catch(({ response }) => console.log(response.message));
  }, []);
  return { user, status };
};
const useGet = (query) => {
  const { adminPrivillege } = useStore();
  useEffect(() => {
    adminPrivillege.loadAllOrders(query);
  }, []);
  return adminPrivillege;
};
