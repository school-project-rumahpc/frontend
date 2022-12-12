import {
  Layout,
  Row,
  Col,
  Button,
  Spin,
  message,
  Segmented,
  Divider,
  Statistic,
  notification,
  Table,
} from 'antd';
import { formatPrice } from '../../utils/priceFormat';
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
  useEffect(() => router.back(), []);
  return (
    <Row justify='center'>
      <h1>Unauthorized! redirecting back...</h1>
    </Row>
  );
};

// const OrdersDisplay = ({ adminPrivillege }) => {
//   const { filteredOrders } = adminPrivillege;
//   return filteredOrders.map(({ deadline, id, status, totalPrice, user }) => {
//     return (
//       <li key={id} style={{ listStyle: 'auto' }}>
//         <Row align={'middle'} justify={'end'} style={{ padding: '0 30px' }}>
//           <Col style={{ textAlign: 'end' }}>
//             <h1>User - {user.username}</h1>
//             <h4>{user.email}</h4>
//             <h4>{user.phone}</h4>
//             {deadline && (
//               <Statistic.Countdown
//                 title={<h3 style={{ color: 'red' }}>Deadline</h3>}
//                 value={new Date(deadline?.replace(' ', 'T')).getTime()}
//                 valueStyle={{ color: 'red' }}
//               />
//             )}
//             <h2 style={{ color: statusColor(status) }}>{status}</h2>
//           </Col>
//           <Divider />
//         </Row>
//       </li>
//     );
//   });
// };

const ContentDisplay = ({ adminPrivillege }) => {
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
  const columnsKey = Object.keys(adminPrivillege.allOrders[0]);
  const columnsKeyProp = columnsKey.map((e) => {
    return {
      key: e,
      dataIndex: e,
      width: e == 'id' && 500,
      title: e[0].toUpperCase() + e.substring(1),
      fixed: e == 'user' && 'right',
      align: e == 'deadline' && 'center',
      render:
        e == 'deadline' &&
        ((deadline) => {
          if (deadline == null) return '-';
          return (
            <Statistic.Countdown
              value={new Date(deadline?.replace(' ', 'T')).getTime()}
              valueStyle={{ color: 'red', fontSize: '16px' }}
            />
          );
        }),
    };
  });
  const data = adminPrivillege.filteredOrders.map((e) => {
    return {
      key: e.id,
      id: e.id,
      status: <h4 style={{ color: statusColor(e.status) }}>{e.status}</h4>,
      totalPrice: formatPrice(e.totalPrice),
      deadline: e.deadline,
      user: e.user.username,
      action:e.deadline && <Button size='small'>Click me</Button>,
    };
  });

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
      <Row justify={'center'}>
        <Table
          size='middle'
          title={() => (
            <h1 style={{ color: statusColor(status) }}>{status} Orders</h1>
          )}
          columns={[
            ...columnsKeyProp,
            { key: 'action',dataIndex:'action', title: 'Action', fixed: 'right' },
          ]}
          dataSource={data}
          scroll={{ x: 1700 }}
          pagination={{
            position: ['bottomCenter'],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Row>
      <section style={{ display: 'none' }}>
        {adminPrivillege.allOrders.map(({ user, deadline, id }) => {
          if (!deadline) return;
          return (
            <Statistic.Countdown
              key={id}
              // value={Date.now() + 3 * 1000}
              value={new Date(deadline?.replace(' ', 'T')).getTime()}
              onFinish={() => {
                adminPrivillege.loadAllOrders({
                  deleted: 'false',
                  payment: 'false',
                });
                notification.warning({
                  message: 'Warning!',
                  description: (
                    <h4>
                      <b>Order from {user.username} </b>
                      , With Order Id : <br />
                      {id}
                      <br /> has failed due to unpaid order
                    </h4>
                  ),
                  duration: 0,
                  placement: 'topLeft',
                  style: { width: 550 },
                });
              }}
            />
          );
        })}
      </section>
    </>
  );
};

const Admin = () => {
  const router = useRouter();
  const { user, status } = useUser();
  const adminPrivillege = useGet({ deleted: 'false', payment: 'false' });
  if (status !== 'done') return <Spin />;
  if (!user || user.role !== 'admin') return <Unauthorized />;

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
      <Content style={{ ...Custom.contentStyle, paddingBottom: '60px' }}>
        {adminPrivillege.status === 'success' ? (
          <ContentDisplay adminPrivillege={adminPrivillege} />
        ) : (
          <Loading />
        )}
      </Content>
    </Layout>
  );
};

export default observer(Admin);

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
