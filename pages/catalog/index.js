import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Navbar from '../../components/bar/navbar';
import Sidebar from '../../components/bar/sidebar';
import Products from '../../components/product list/products';
const { Footer, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
      <Sider
        style={{
          minHeight: '100vh',
          borderRight: '3px solid #1ba675',
          backgroundColor: '#fff',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
      >
        <Button
          style={{ height: '100px' }}
          icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
          type='link'
          onClick={() => setCollapsed(!collapsed)}
          block
        />
        <Sidebar />
      </Sider>
      <Layout style={{minHeight: '100vh', maxHeight: '100vh', overflowY: 'scroll' }}>
        <Navbar />
        <Content style={{ minHeight: 'max-content' }}>
          <Products />
        </Content>
        <Footer>
          <h5 style={{ color: 'GrayText' }}>
            Made by &nbsp;
            <a target={'_blank'} href='https://instagram.com/darwin.id' rel="noreferrer">Darwin </a>
            &&nbsp;
            <a target={'_blank'} href='https://instagram.com/arilramadani24' rel="noreferrer">Aril</a>
          </h5>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default observer(Catalog);
