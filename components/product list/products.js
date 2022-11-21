import { Button, Empty, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../components/storeContext';
import styles from '../../styles/product.module.css';

const List = ({ item }) => {
  // console.log(item);
  return (
    <div className={styles['data-wrapper']}>
      {item.products.map((e) => {
        return (
          <ul key={e.id} title={e.product_name}>
            <li>{e.product_name}</li>
            <li>Rp.{e.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</li>
            <li>
              <Button size='small' onClick={() => console.log(e.id)}>
                Get id
              </Button>
            </li>
          </ul>
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
    return (
      <Spin
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size='large'
      />
    );
  }
  //if no data
  if (!store.allData) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Empty>
          <Button type='link' onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Empty>
      </div>
    );
  }
  return (
    <>
      {store.filteredData.map((e) => {
        return (
          <section className={styles.container} key={e.id}>
            <div className={styles.header}>
              <h1>{e.category_name}</h1>
            </div>
            <List item={e} />
          </section>
        );
      })}
    </>
  );
};
export default observer(Products);
