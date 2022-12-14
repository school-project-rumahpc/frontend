import { message } from 'antd';
import { useRouter } from 'next/router';
import Background from '../components/landing/background';
import FormPage from '../components/landing/form';
import Navbar from '../components/landing/header';
import styles from '../styles/home.module.css';
import { TokenUtil } from '../utils/token';

TokenUtil.loadToken();

const Home = () => {
  return (
    <>
      {TokenUtil.accessToken ? (
       window.open('/catalog','_SELF')
      ) : (
        <div className={styles.container}>
          <main className={styles.main}>
            <Navbar />
            <FormPage />
            <footer style={{ marginTop: 'auto', marginBottom: '20px' }}>
              <h5 style={{ color: 'GrayText' }}>
                Copyright &#169; RumahPc 2022
              </h5>
            </footer>
          </main>
          <section className={styles.bg}>
            <Background />
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
