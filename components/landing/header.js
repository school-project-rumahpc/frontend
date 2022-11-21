import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={'/logo.svg'} width={121} height={84} alt='Logo' priority />
      </div>
      <ul className={styles['list-container']}>
        <li>
          <Link href='/catalog'>
          Catalog
          </Link>
        </li>
        <li>
          <Link href='/our-retail'>
          Our Shop
          </Link>
        </li>
        <li>
          <Link href='/how'>
          How to order
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
