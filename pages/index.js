// import Form from '../components/landing/form';
import Styles from '../styles/home.module.css';
import Navbar from '../components/landing/header';
import Footer from '../components/landing/footer';
import Background from '../components/landing/background';

const Home = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Navbar />
        {/* FIXME: Form ts to js */}
        {/* <Form /> */}
        <Footer />
      </main>
      <section className={Styles.bg}>
        <Background />
      </section>
    </div>
  );
};

export default Home;
