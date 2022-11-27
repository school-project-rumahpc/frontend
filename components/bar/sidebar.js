import {
  DesktopOutlined,
  EllipsisOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../storeContext';

const Sidebar = () => {
  const {productStore} = useStore()
  return (
    <Menu
      defaultSelectedKeys={'1'}
      onChange={(e) => console.log(e)}
      items={[
        {
          key: '1',
          icon: <EllipsisOutlined />,
          label: 'All Category',
          onClick: () => {
            if (!productStore.allProducts)return;
            productStore.filterData()
          },
        },
        {
          key: 'Computer',
          icon: <DesktopOutlined />,
          label: 'Personal Computer',
          onClick: (e) => {
            if (!productStore.allProducts)return;
            productStore.filterData(e.key)
          },
        },
        {
          key: 'Laptop',
          icon: <LaptopOutlined />,
          label: 'Laptop',
          onClick: (e) => {
            if (!productStore.allProducts)return;
            productStore.filterData(e.key)
          },
        },
      ]}
    />
  );
};

export default observer(Sidebar);
