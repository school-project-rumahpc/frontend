import { Layout, Row, Col, Button, Spin, message, Segmented } from 'antd';
import { Custom, statusColor } from '../../utils/custom';
import { TokenUtil } from '../../utils/token';
import { http } from '../../utils/http';
import {useStore} from '../../components/storeContext'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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

const ContentDisplay = ()=>{
   const allOrders = useGet('false')
   const status = ['Fail','Waiting','Pending','Approved','OnQueue','Finished']
   console.log(allOrders)
   return(
      <Segmented style={{color:'#009867'}} block options={status}/>
   )
}

const Admin = () => {
  const router = useRouter();
  const { user, status } = useUser();
  if (status !== 'done') return <Spin />;
  if (user.role !== 'admin') return <Unauthorized />;
  if (!user) return;

  const logOut = () => {
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    router.push('/');
    message.success('Logout success')
  };

  return (
    <Layout
      style={{ height: '100vh', maxHeight: '100%', backgroundColor: '#009867' }}
    >
      <Header style={{ zIndex: '1' }}>
        <Row
          align='middle'
          justify='space-between'
          style={{ padding: '0 20px', height: '100%' }}
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
      <Content style={Custom.contentStyle}>
      <ContentDisplay/>
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
   const {adminPrivillege} = useStore()
   useEffect(()=>{
      adminPrivillege.loadAllOrders(query)
   },[])
   return adminPrivillege
}