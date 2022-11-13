import { Col, Divider, Layout, Row } from 'antd';
import Image from 'next/image';
import Navbar from '../../components/bar/navbar';
const { Header, Content } = Layout;

const OurShop = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#009867' }}>
      <Header
        style={{
          boxShadow: ' 0px 2px 5px rgba(0, 0, 0, 0.25)',
          height: '100px',
          zIndex: '1',
        }}
      >
        <Navbar />
      </Header>
      <Content
        style={{
          boxShadow: ' 0px 0 50px 30px rgba(0, 0, 0, 0.25)',
          margin: '0 120px',
          height: '100%',
          backgroundColor: '#fff',
        }}
      >
        <Layout style={{ backgroundColor: '#fff' }}>
          <Row align='middle'>
            <Divider
              orientation='left'
              style={{ fontSize: '1.6em', borderColor: '#009867' }}
            >
              Our Retail
            </Divider>
          </Row>
          <Row align='middle' gutter={[20, 0]}>
            <Col flex='225px'>
              <Image src='/store.svg' width={225} height={225} />
            </Col>
            <Col flex='auto'>
              <h1 style={{ color: '#221E1F', fontSize: '2em' }}>
                Rumah Pc Retail
              </h1>
              <h3>
                We are open from <br />
                7AM - 5PM
              </h3>
              <p>
                Jl. Hanjuang VII No.88, RT.003/RW.003,
                <br />
                Jatibening Baru, Kec. Pd. Gede,
                <br />
                Kota Bks, Jawa Barat 17412
              </p>
            </Col>
          </Row>
          <Row style={{ marginLeft: '20px' }}>
            <h1>
              Wanna pickup your stuff?&nbsp;
              <a
                href='https://g.page/dignitas-id?share'
                target={'_blank'}
                style={{ color: 'crimson' }}
              >
                Get a direction here.
              </a>
            </h1>
          </Row>
        </Layout>
      </Content>
    </Layout>
  );
};

export default OurShop;
