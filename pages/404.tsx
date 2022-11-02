import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100vh',
        backgroundColor:'rgb(0, 152, 103, 0.3)'
      }}
    >
      <div style={{color:'red'}}>
        <h1>404 | Page Not Found</h1>
      </div>
    </div>
  );
};

export default Custom404;
