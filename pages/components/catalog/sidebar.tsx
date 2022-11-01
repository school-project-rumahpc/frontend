import { NextPage } from 'next';
import Styles from '../../../styles/catalog.module.css';

const Sidebar: NextPage = () => {
  return (
    <div className={Styles.sidebar}>
      <header>
        <p className={Styles.title}>Category</p>
      </header>
      <main>
        <div className={Styles['list-wrapper']}></div>
      </main>
    </div>
  );
};

export default Sidebar;
