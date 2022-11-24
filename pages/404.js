import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter()
  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '30vh',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'rgb(0, 152, 103, 0.1)',
      }}
    >
      <span style={{ textAlign: 'center' }} className='animated'>
        <h2 style={{ WebkitTextStroke: '2px #009867' }}>
          404 | Page Not Found
        </h2>
        <h2 style={{ color: '#009867' }}>404 | Page Not Found</h2>
      </span>
      <div>
          <a onClick={()=>router.back()}>
            <p style={{color:'blue', cursor: 'pointer' }}>Back?</p>
          </a>
      </div>
    </div>
  );
};

export default Custom404;
