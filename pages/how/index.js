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
  if (loading)
    return <Spin style={{ display: 'flex', margin: 'auto' }} size='large' />;
  return <></>;
};

export default observer(HowToOrder);
