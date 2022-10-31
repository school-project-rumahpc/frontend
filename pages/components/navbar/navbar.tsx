import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Styles from '../../../styles/header.module.css';

const Navbar: NextPage = () => {
  return (
    <nav className={Styles.container} style={{boxShadow:' 0px 2px 5px rgba(0, 0, 0, 0.25)'}}>
      <div className={Styles.logo}>
        <Image src={'/logo.svg'} width={121} height={84} alt='Logo' priority />
      </div>
      <section className={Styles.search}>
        <input type='search' />
      </section>
      <div className={Styles.store}>
        <Link href={''}>
          <a>
            <Image
              src={'/store.svg'}
              width={35}
              height={35}
              alt='Store'
              priority
            />
          </a>
        </Link>
      </div>
      <div className={Styles.cart}>
        <Link href={''}>
          <a>
            <Image
              src={'/cart.svg'}
              width={35}
              height={35}
              alt='Cart'
              priority
            />
          </a>
        </Link>
      </div>
      <div className={Styles.user}>
        <div id={Styles[1]}></div>
        <div id={Styles[2]}></div>
        <div id={Styles[3]}></div>
        <Link href={''}>
          <a>
            <Image
              src={'/account.svg'}
              width={40}
              height={40}
              alt='Cart'
              priority
            />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
