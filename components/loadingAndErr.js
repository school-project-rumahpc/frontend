import { Button, Empty, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from './storeContext';

const Loading = () => {
  return (
    <Spin
      style={{
        marginTop: '35vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size='large'
    />
  );
};
const Err = ({id}) => {
  const store = useStore();
  return (
    <div
      style={{
        marginTop: '25vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Empty description={'Something went wrong!'}>
        <Button
          type='link'
          style={{ color: 'blue' }}
          onClick={() => {store.loadData();store.loadItem(id)}}
        >
          Reload
        </Button>
      </Empty>
    </div>
  );
}
observer(Err)
export { Err, Loading };

