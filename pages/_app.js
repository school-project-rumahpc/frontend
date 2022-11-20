import "../styles/globals.css";
import Schema from "async-validator";
import { StoreProvider } from "../components/storeContext";
//NOTE: this code below is to disable async-validation warn
Schema.warning = function () {};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
