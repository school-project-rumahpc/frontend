import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Background from '../components/landing/background';
import FormPage from '../components/landing/form';
import Navbar from '../components/landing/header';
import styles from '../styles/home.module.css';
import { TokenUtil } from '../utils/token';

const Redirect = () => {
  const router = useRouter();
  router.push('/catalog');
  return <p>Already logged in, Redirecting...</p>;
};

const Home = () => {
  const [isLoggedIn, setIslogged] = useState(false);
  useEffect(() => {
    TokenUtil.loadToken();
    if (!TokenUtil.accessToken) return;
    setIslogged(true)
  }, [TokenUtil.accessToken]);
  return (
    <>
      {isLoggedIn ? (
        <Redirect />
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
