import { NextPage } from 'next';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        paddingTop:'30vh',
        alignItems: 'center',
        flexDirection:'column',
        height: '100vh',
        backgroundColor: 'rgb(0, 152, 103, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center' }} className='animated'>
        <h2>404 | Page Not Found</h2>
        <h2>404 | Page Not Found</h2>
      </div>
      <div style={{}}>
      <Link href={'/catalog'}>
        <a style={{ cursor: 'pointer' }}>Back?</a>
      </Link>        
      </div>
    </div>
  );
};

export default Custom404;
