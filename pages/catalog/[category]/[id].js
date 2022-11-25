import { Button, Card, Col, Layout, Row , Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../../components/bar/navbar';
import { Err, Loading } from '../../../components/loadingAndErr';
import { useStore } from '../../../components/storeContext';
import { Custom } from '../../../utils/custom';
const {Title} = Typography
const { Content } = Layout;

const DetailDisplay = ({item}) =>{
    const {details} = item
    let detailArr = []
    for(let detailKey in details){
    detailArr = [...detailArr,`${detailKey} : ${details[detailKey]}`]
    }
    console.log(detailArr)
    return(
        <>
        {detailArr.map(i=><p>{i}</p>)}
        </>
    )
}

const ProductDisplay = ({store}) => {
    const {item} = store
    const capitalize = {textTransform:'capitalize'}
    return(
        <>
             <Col>
              <Card
                style={{
                  margin: '0 50px',
                }}
                cover={
                  <img
                    alt='photo'
                    src={item.images[0]}
                    width={300}
                    height={375}
                  />
                }
              >
                <Card.Meta
                  style={{ justifyContent: 'right', padding:'12px'}}
                  description={<Button type='primary'>Add to cart</Button>}
                />
              </Card>
            </Col>
            <Col
              flex={'auto'}
            >
              <Title level={4} style={capitalize}>{item.name.toLowerCase()}</Title>
              <p style={{color:'black'}}>{
                `Rp.${item.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}
              </p>
              <h3>Specification :</h3>
              <DetailDisplay item={ item }/>
            </Col>
        </>
    )
}

const Product = () => {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    store.status = 'pending'
    if(router.isReady){
    store.loadData();
    store.loadItem(router.query.id)}
  }, [router.isReady]);
  
  //if no data
  if (store.status === 'error' && !store.item) {
    return <Err id={router.query.id} />;
  }

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#009867' }}>
      <Navbar />
      <Content style={Custom.contentStyle}>
        <Layout style={{ height: '100%' }}>
          <Row align={'middle'} style={{ height: '100%' }} justify={'center'}>
            {store.status === 'pending' ? <Loading/> : <ProductDisplay store={store}/>}      
          </Row>
        </Layout>
      </Content>
    </Layout>
  );
};

export default observer(Product);
