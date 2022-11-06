import Navbar from '../../components/bar/navbar';
import Styles from '../../styles/catalog.module.css';
import Sidebar from '../../components/bar/sidebar';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import { Button } from 'antd';
// import dataFetch from '../api/fetch';

const Catalog = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // dataFetch()
    //   .then((d) => {
    //     setData(d);
    setLoading(false);
    // });
  }, []);

  return (
    <div className={Styles.container}>
      <Sidebar dataList={data} />
      <Navbar />
      {loading ? (
        <Loading />
      ) : !data ? (
        <div>
          <p>no data</p>
        </div>
      ) : (
        <div className={Styles.main}>
          {data.map(({ category_name, id }) => (
            <p key={id}>
              {id}. title :<br />
              {category_name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
