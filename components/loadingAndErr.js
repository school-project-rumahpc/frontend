import { Button, Empty, Spin } from 'antd';
import { useRouter } from 'next/router';

const Loading = () => {
  return (
    <Spin
      style={{
        padding:'25px'
      }}
      size='large'
    />
  );
};
const Err = () => {
  const {reload} = useRouter()
  return (
    <div
      style={{
        marginTop: '25vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Empty description={<p style={{color:'grey'}}>Something went wrong!</p>}>
        <Button
          type='link'
          style={{ color: 'blue' }}
          onClick={() => {reload()}}
        >
          Reload
        </Button>
      </Empty>
    </div>
  );
}
export { Err, Loading };

