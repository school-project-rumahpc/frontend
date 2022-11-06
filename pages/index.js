// import Form from '../components/landing/form';
import Styles from '../styles/home.module.css';
import Navbar from '../components/landing/header';
import Footer from '../components/landing/footer';
import Background from '../components/landing/background'
import FormPage from '../components/landing/form';

const Home = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Navbar />
        {/* FIXME: Form ts to js */}
        <FormPage/>
        <Footer />
      </main>
      <section className={Styles.bg}>
        <Background />
      </section>
    </div>
  );
};

export default Home;
