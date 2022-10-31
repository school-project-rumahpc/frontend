import { NextPage } from 'next';
import Navbar from '.././components/navbar/navbar';
import Styles from '../../styles/catalog.module.css';
import Sidebar from '../components/catalog/sidebar';

const Catalog: NextPage = () => {
  return (
    <div className={Styles.container}>
      <Sidebar/>
      <main>
      <Navbar />
      </main>
    </div>
  );
};

export default Catalog;
