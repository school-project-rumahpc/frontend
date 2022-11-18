import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useState } from 'react';
import Navbar from '../../components/bar/navbar';
import Sidebar from '../../components/bar/sidebar';
const { Header, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(1)
  const getKey =(key)=>{
    setKey(key)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <Sidebar currentKey={getKey}/>
      </Sider>
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
          <h1>{key}</h1>
          <h1>clicked : </h1>
          <Button type='primary' >Click me to see</Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Catalog;
