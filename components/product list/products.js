import { Button, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../components/storeContext';
import { http } from '../../utils/http';

const List = ({ item }) => {
  console.log(item);
  return (
    <ul key={item.id}>
      {item.products.map((e) => {
        return (
          <>
            <li>{e.product_name}</li>
            <li><Button onClick={()=>console.log(e.id)}>Get id</Button></li>
          </>
        );
      })}
    </ul>
  );
};

const Products = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    http
      .get()
      .then(({ body }) => {
        store.loadData(body);
        setLoading(false);
      })
      .catch(() => {
        throw new Error('something went wrong');
      });
  }, [store]);

  if (loading) {
    return (
      <Spin
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size='large'
      />
    );
  }
  if (!store.allData) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '100px',
        }}
      >
        <h1 style={{ fontSize: '18px', textAlign: 'center' }}>
          something went wrong!
          <br />
          <a style={{ color: 'blue' }} onClick={() => window.location.reload}>
            Refresh?
          </a>
        </h1>
      </div>
    );
  }
  return (
    <>
      {store.allData.map((e) => {
        return (
          <div key={e.id}>
            <h1>{e.category_name}</h1>
            <List item={e} />
            <hr />
          </div>
        );
      })}
    </>
  );
};
export default observer(Products);
