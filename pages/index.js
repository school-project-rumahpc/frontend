// import Form from '../components/landing/form';
import Background from '../components/landing/background';
import FormPage from '../components/landing/form';
import Navbar from '../components/landing/header';
import Styles from '../styles/home.module.css';

const Home = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Navbar />
        <FormPage />
        <footer style={{ position: 'absolute', bottom: 0 }}>
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
