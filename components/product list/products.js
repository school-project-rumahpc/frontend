import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useStore } from '../../components/storeContext';
import styles from '../../styles/product.module.css';
import { Custom } from '../../utils/custom';
import { Err, Loading } from '../loadingAndErr';
const List = ({ item, cat }) => {
  const router = useRouter();
  const dataWrapper = useRef();
  return (
    <div className={styles['data-wrapper']} ref={dataWrapper}>
      <Button
        style={{ position: 'sticky', top: '40%', left: '0', zIndex: '1' }}
        shape='circle'
        onClick={() => (dataWrapper.current.scrollLeft -= 350)}
      >
        <LeftOutlined />
      </Button>
      {item.products.map((e) => {
        return (
          <Card
            className={styles['ant-card']}
            onClick={() => router.push(`/catalog/${cat}/${e.id}`)}
            hoverable
            key={e.id}
            style={{
              backgroundColor: cat === 'Laptop' ? '#373737' : null,
              height: '350px',
              minWidth: '250px',
            }}
            cover={
              <Image
                style={Custom.loadingGif}
                src={e.images[0]}
                alt={e.name}
                width={250}
                height={280}
                loading='lazy'
                title={e.name}
              />
            }
          >
            <Card.Meta
              className={styles['ant-card-meta']}
              title={
                <h3 style={{ color: cat === 'Laptop' ? 'whitesmoke' : null }}>
                  {`Rp.${e.price
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`}
                </h3>
              }
              description={
                <h5 style={{ color: cat === 'Laptop' ? 'whitesmoke' : null }}>
                  {e.name}
                </h5>
              }
            />
          </Card>
        );
      })}
      <Button
        style={{ position: 'sticky', top: '40%', right: '0' }}
        shape='circle'
        onClick={() => (dataWrapper.current.scrollLeft += 350)}
      >
        <RightOutlined />
      </Button>
    </div>
  );
};

const Products = () => {
  const { productStore } = useStore();
  useEffect(() => {
    productStore.loadData();
  }, [productStore]);

  if (productStore.status === 'pending') {
    return <Loading />;
  }
  //if no data
  if (!productStore.allProducts && productStore.status === 'error') {
    return <Err />;
  }
  return (
    <>
      {productStore.filteredData.map((e) => {
        return (
          <section className={styles.container} key={e.id}>
            <div className={styles.header}>
              <h1>{e.category_name}</h1>
            </div>
            <List item={e} cat={e.category_name} />
          </section>
        );
      })}
    </>
  );
};
export default observer(Products);
