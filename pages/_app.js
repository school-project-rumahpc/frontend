import '../styles/globals.css'
//NOTE: this code below is to disable async-validation warn 
import Schema from 'async-validator';
Schema.warning = function(){};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
