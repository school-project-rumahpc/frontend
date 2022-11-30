import { TokenUtil } from '../../utils/token';
import { useStore } from '../../components/storeContext';
import { useEffect } from 'react';
import { Loading } from '../../components/loadingAndErr';
import { observer } from 'mobx-react-lite';

const Cart = () => {
  const { cartStore } = useStore();
  useEffect(() => {
    cartStore.loadCart();
  }, [TokenUtil.accessToken]);

  if (cartStore.status === 'pending') return <Loading />;

  return <div>&nbsp;id:</div>;
};

export default observer(Cart);
