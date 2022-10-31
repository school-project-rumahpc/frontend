import { NextPage } from 'next';
import Styles from '../../../styles/background.module.css'

const Background: NextPage = () => {
  return (
    <div className={Styles.container}>
        <span>
        <h1>Rumah + Pc</h1>
        <h5>find it, like it, pick it</h5>
        </span>
    </div>
  );
};

export default Background;
