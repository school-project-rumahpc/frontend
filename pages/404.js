import Link from 'next/link';

const Custom404 = () => {
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
        <Link href={'/'}>
          <a>
            <p style={{ cursor: 'pointer' }}>Back?</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
