import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useEffect } from 'react';
import { useStore } from '../../components/storeContext';
import styles from '../../styles/product.module.css';
import { Err, Loading } from '../loadingAndErr';
const List = ({ item, cat }) => {
  // console.log(item);
  return (
    <div className={styles['data-wrapper']}>
      {item.products.map((e) => {
        return (
          <Card
          key={e.id}
            style={{ height: '350px', minWidth: '250px' }}
            bordered={false}
            cover={
              <Image
                style={{
                  backgroundImage:'url(/logo.svg)',
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:'center'
                }}
                src={e.images[0]}
                alt={e.product_name}
                width={250}
                height={280}
                loading='lazy'
                // placeholder='blur'
                // blurDataURL='/cart.svg'
              />
            }
          >
            <Card.Meta
              title={`Rp.${e.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`}
              description={e.product_name}
            />
          </Card>
        );
      })}
    </div>
  );
};

const Products = () => {
  const store = useStore();
  useEffect(() => {
    store.loadData();
  }, [store]);

  if (store.status === 'pending') {
    return <Loading />;
  }
  //if no data
  if (!store.allData && store.status === 'error') {
    return <Err />;
  }
  return (
    <>
      {store.filteredData.map((e) => {
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
