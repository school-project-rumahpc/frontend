import { NextPage } from 'next';
import Navbar from '../../components/bar/navbar';
import Styles from '../../styles/catalog.module.css';
import Sidebar from '../../components/bar/sidebar';
import { useEffect, useState } from 'react';
// import dataFetch from '../api/fetch';

interface data {
  title: string;
  id: number;
}

const Catalog: NextPage = () => {
  const [data, setData] = useState<data[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
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
      {loading ? (
        <p>loading...</p>
      ) : !data ? (
        <p>no data</p>
      ) : (
        <div className={Styles.main}>
          {data.map(({ title, id }) => (
            <p key={id}>{id}. title :<br />{title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
