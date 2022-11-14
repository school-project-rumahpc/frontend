import { message } from 'antd';
import { useRouter } from 'next/router';
import Background from '../components/landing/background';
import FormPage from '../components/landing/form';
import Navbar from '../components/landing/header';
import Styles from '../styles/home.module.css';
import { TokenUtil } from '../utils/token';

const Home = () => {
  const router = useRouter()
  //user check
  TokenUtil.loadToken();
  if (TokenUtil.accessToken) {
    message.error('You\'re logged in')
    router.push('/catalog')
    return;
  }

  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Navbar />
        <FormPage />
        <footer style={{ position: 'absolute', bottom: '20px' }}>
          <h5 style={{ color: 'GrayText' }}>Copyright &#169; RumahPc 2022</h5>
        </footer>
      </main>
      <section className={Styles.bg}>
        <Background />
      </section>
    </div>
  );
};

export default Home;
