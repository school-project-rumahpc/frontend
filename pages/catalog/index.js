import { Layout } from 'antd';
import { useState } from 'react';
import Navbar from '../../components/bar/navbar';
const { Header, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          borderRight: '3px solid #1ba675',
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      ></Sider>
      <Layout>
        <Header
          style={{
            boxShadow: ' 0px 2px 5px rgba(0, 0, 0, 0.25)',
            height: '100px',
          }}
        >
          <Navbar />
        </Header>
        <Content>
          <h1>Lorem ipsum dolor sin amet</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Catalog;
