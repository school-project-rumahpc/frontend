import styles from '../styles/product.module.css';
import Link from "next/link";

const FloatButton = ({ href, Icon }) => {
  return (
    <Link href={href}>
      <a>
        <div
          className={styles.cart}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '45px',
            height: '45px',
            backgroundColor: 'white',
            padding: '6px',
            borderRadius: '50%',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <Icon style={{ fontSize: '22px', marginTop: '2px' }} />
        </div>
      </a>
    </Link>
  );
};
export default FloatButton