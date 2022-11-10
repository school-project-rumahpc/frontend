import { Col, Input, Layout, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Styles from '../../styles/header.module.css';
const { Header, Content, Sider } = Layout;

const Catalog = () => {
  const [collapsed, setCollapsed] = useState();

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ borderRight: '3px solid #1ba675' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      ></Sider>
      <Layout>
        <Header
          style={{
            boxShadow: ' 0px 2px 5px rgba(0, 0, 0, 0.25)',
            height: '100px',
          }}
        >
          <Row
            justify='space-between'
            align='middle'
            style={{ height: '100px' }}
          >
            <Col className={Styles.logo}>
              <Link href={'/catalog'}>
                <a>
                  <Image
                    src={'/logo.svg'}
                    width={121}
                    height={84}
                    alt='Logo'
                    priority
                  />
                </a>
              </Link>
            </Col>
            <Col style={{margin:'auto'}}>
              <Input.Search
              style={{width:'350px'}}
                onSearch={onSearch}
                allowClear 
                /*enterButton='Search'*/
              />
            </Col>
            <Col>
              <a>Store</a>
            </Col>
            <Col>
              <a>Cart</a>
            </Col>

            <Col>
              <div className={Styles.user}>
                <div id={Styles[1]}></div>
                <div id={Styles[2]}></div>
                <div id={Styles[3]}></div>
                <Link href={''}>
                  <a>
                    <Image
                      src={'/account.svg'}
                      width={40}
                      height={40}
                      alt='Cart'
                      priority
                    />
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Header>
        <Content>
          <h1>Lorem ipsum dolor sin amet</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Catalog;
