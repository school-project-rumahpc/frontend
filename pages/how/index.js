import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../components/storeContext';
const superagent = require('superagent');

const HowToOrder = () => {
  const [loading, setLoading] = useState(false);
  const store = useStore();
  useEffect(() => {
    setLoading(true);
    superagent.get('https://dummyjson.com/products').end((err, res) => {
      store.loadData(res.body);
      console.log(store.dataList);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <Spin
        style={{
          display: 'flex',
          height:'100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size='large'
      />
    );
  }
  return (
    <>
      <h1>Data successfully fetched. total : {store.dataList.limit}</h1>
      {store.dataList.products.map((i) => {
        return (
          <div style={{padding:'0 20px'}} key={i.id}>
            <hr />
            <h1>{i.title}</h1>
          </div>
        );
      })}
    </>
  );
};

export default observer(HowToOrder);
