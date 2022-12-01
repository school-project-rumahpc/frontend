import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { http } from '../utils/http';
import { Card, Layout, Row, Col } from 'antd';
import Navbar from '../components/bar/navbar';
import { Err, Loading } from '../components/loadingAndErr';
import styles from '../styles/product.module.css';
import Image from 'next/image';
import { Custom } from '../utils/custom';
import { useState } from 'react';
const { Content } = Layout;

const Search = () => {
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    if (!router.isReady) return;
    setData(null);
    const res = http.search(router.query.s);
    res
      .then((res) => setData(res.body))
      .catch(({ response }) => {
        if (!response) {
          setData(false);
          return;
        }
        if (response.status === 404) {
          setData(404);
          return;
        }
      });
  }, [router.isReady, router.query.s]);

  if (data === false) {
    return <Err />;
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh', maxHeight: '100%' }}>
        <Navbar />
        <Content style={{ padding: '25px 30px' }}>
          {data === 404 ? (
            <p style={{ color: 'grey', width: '100%', textAlign: 'center' }}>
              Sorry, product not found!
            </p>
          ) : data ? (
            <Row justify={'center'} align='middle' gutter={[25, 25]}>
              {data.map((item) => {
                return (
                  <Col key={item.id}>
                    <Card
                      className={styles['ant-card']}
                      hoverable
                      onClick={() =>
                        router.push(
                          `/catalog/${item.category.category_name}/${item.id}`
                        )
                      }
                      style={{
                        padding: '1px',
                        backgroundColor:
                          item.category.category_name === 'Laptop'
                            ? '#373737'
                            : null,
                        height: '350px',
                      }}
                      cover={
                        <Image
                          style={Custom.loadingGif}
                          src={item.images[0]}
                          alt={item.name}
                          width={250}
                          height={280}
                          loading='lazy'
                          title={item.name}
                        />
                      }
                    >
                      <Card.Meta
                        className={styles['ant-card-meta']}
                        title={
                          <h3
                            style={{
                              color:
                                item.category.category_name === 'Laptop'
                                  ? 'whitesmoke'
                                  : null,
                            }}
                          >
                            {`Rp.${item.price
                              .toString()
                              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`}
                          </h3>
                        }
                        description={
                          <h5
                            style={{
                              color:
                                item.category.category_name === 'Laptop'
                                  ? 'whitesmoke'
                                  : null,
                            }}
                          >
                            {item.name}
                          </h5>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Loading />
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default Search;
