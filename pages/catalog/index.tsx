import { NextPage } from 'next';
import Navbar from '../../components/bar/navbar';
import Styles from '../../styles/catalog.module.css';
import Sidebar from '../../components/bar/sidebar';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import dataFetch from '../api/fetch';

interface data {
  category_name: string;
  id: number;
}

const Catalog: NextPage = () => {
  const [data, setData] = useState<data[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dataFetch()
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);
  // TODO:  delete log if done
  console.log(data);

  return (
    <div className={Styles.container}>
      <Sidebar />
      <Navbar />
      {/* <Loading/> */}
      {loading ? (
        <Loading/>
      ) : !data ? (
        <p>no data</p>
      ) : (
        <div className={Styles.main}>
          {data.map(({ category_name, id }) => (
            <p key={id}>{id}. title :<br />{category_name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
