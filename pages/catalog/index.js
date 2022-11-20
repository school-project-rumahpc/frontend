import { LeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useState } from 'react';
import Navbar from '../../components/bar/navbar';
import Sidebar from '../../components/bar/sidebar';
import {observer} from 'mobx-react-lite'
const { Header, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(1)
  const getKey =(key)=>{
    //props from menu
    setKey(key)
  }

  useEffect(() => {
  }, [])
  

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

        </Content>
      </Layout>
    </Layout>
  );
};

export default observer(Catalog);
