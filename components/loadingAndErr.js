import { Button, Empty, Spin } from 'antd';
import { useStore } from './storeContext';

const Loading = () => {
  return (
    <Spin
      style={{
        minHeight:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size='large'
    />
  );
};
const Err = ({id}) => {
  const {productStore} = useStore();
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
          onClick={() => {productStore.loadData();productStore.loadItem(id)}}
        >
          Reload
        </Button>
      </Empty>
    </div>
  );
}
export { Err, Loading };

