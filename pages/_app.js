import '../styles/globals.css';
//NOTE: this code below is to disable async-validation warn
import Schema from 'async-validator';
import { StoreProvider } from '../components/storeContext';
Schema.warning = function () {};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
