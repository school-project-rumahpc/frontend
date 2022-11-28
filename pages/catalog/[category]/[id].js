import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../../components/bar/navbar';
import { Err, Loading } from '../../../components/loadingAndErr';
import { useStore } from '../../../components/storeContext';
import { Custom } from '../../../utils/custom';
const { Title } = Typography;
const { Content } = Layout;

const DetailDisplay = ({ item }) => {
  const { details } = item;
  let detailArr = [];
  for (let detailKey in details) {
    detailArr = [...detailArr, `${detailKey} : ${details[detailKey]}`];
  }
  console.log(detailArr);
  return (
    <>
      {detailArr.map((i) => (
        <p key={i.slice(0, 5)}>{i.indexOf('null') < 0 ? i : null}</p>
      ))}
    </>
  );
};

const ProductDisplay = ({ productStore , cat}) => {
  const { item } = productStore;
  const capitalize = { textTransform: 'capitalize' };
  return (
    <>
      <Col>
        <Card
          style={{
            padding:'1px',
            backgroundColor: cat === "Laptop" ? "#373737" : null,
            minWidth: "250px",
          }}
          cover={
            <Image
              style={Custom.loadingGif}
              alt='photo'
              src={item.images[0]}
              width={300}
              height={375}
              loading='lazy'
            />
          }
        >
          <Card.Meta
            style={{ justifyContent: 'right', padding: '10px 0' }}
            title={<Button size='middle' type='primary'>Add to cart</Button>}
          />
        </Card>
      </Col>
      <Col flex={'auto'}>
        <Title level={4} style={capitalize}>
          {item.name.toLowerCase()}
        </Title>
        <p style={{ color: 'black' }}>
          {`Rp.${item.price
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`}
        </p>
        <h3>Specification :</h3>
        <DetailDisplay item={item} />
      </Col>
    </>
  );
};

const Product = () => {
  const { productStore } = useStore();
  const router = useRouter();
  const cat = router.query.category
  useEffect(() => {
    productStore.status = 'pending';
    if (router.isReady) {
      productStore.loadItem(router.query.id);
      productStore.loadData();
    }
    if (productStore.item === null) return;
  }, [router.isReady]);
  //if no data
  if (productStore.status === 'error' && !productStore.item) {
    return <Err />;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        maxHeight: '100%',
        backgroundColor: '#009867',
      }}
    >
      <Navbar />
      {/*FIXME: FIX DESCRIPTION ON LONG DESCRIPTION  */}
      <Content style={{ ...Custom.contentStyle, padding: '3%' }}>
        <Row align={'middle'} justify={'center'} gutter={[50, 50]}>
          {productStore.item ? (
            <ProductDisplay productStore={productStore} cat={cat}/>
          ) : (
            <Loading />
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default observer(Product);
