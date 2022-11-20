import Background from "../components/landing/background";
import FormPage from "../components/landing/form";
import Navbar from "../components/landing/header";
import Styles from "../styles/home.module.css";
import { TokenUtil } from "../utils/token";

const Home = () => {
  //user check
  TokenUtil.loadToken();
  if (TokenUtil.accessToken) {
    window.location.href = '/catalog'
    return;
  }

  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Navbar />
        <FormPage />
        <footer style={{ marginTop: "auto", marginBottom: "20px" }}>
          <h5 style={{ color: "GrayText" }}>Copyright &#169; RumahPc 2022</h5>
        </footer>
      </main>
      <section className={Styles.bg}>
        <Background />
      </section>
    </div>
  );
};

export default Home;
