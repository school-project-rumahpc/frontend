import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Navbar from '../../components/bar/navbar';
import Sidebar from '../../components/bar/sidebar';
import Products from '../../components/product list/products';
const { Footer,Header, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout style={{ minHeight: '100vh' , maxHeight: '100vh'}}>
      <Sider
        style={{
          borderRight: '3px solid #1ba675',
          backgroundColor:'#fff'
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <Button
        style={{height:'100px'}}
          icon={collapsed?<MenuOutlined/>:<LeftOutlined/>}
          type='link'
          onClick={() => setCollapsed(!collapsed)}
          block
        />
        <Sidebar/>
      </Sider>
      <Layout style={{maxHeight:'100vh', overflowY:'scroll'}}>
        <Header
          style={{
            boxShadow: ' 0px 2px 5px rgba(0, 0, 0, 0.25)',
            height: '100px',
          }}
        >
          <Navbar />
        </Header>
        <Content style={{minHeight:'max-content'}}>
          <Products/>
        </Content>
        <Footer>Copyright all rights reserved</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(Catalog);
