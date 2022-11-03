import { NextPage } from 'next';
import Image from 'next/image';
import Styles from '../../styles/header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.logo}>
        <Image src={'/logo.svg'} width={121} height={84} alt='Logo' priority />
      </div>
      <ul className={Styles['list-container']}>
        <li>
          <Link href='/catalog'>
          Catalog
          </Link>
        </li>
        <li>
          <Link href=''>
          Our Shop
          </Link>
        </li>
        <li>
          <Link href=''>
          How to order
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
