import {
  DesktopOutlined,
  EllipsisOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

const Sidebar = (props) => {
  const router = useRouter();
  return (
    <Menu
      defaultSelectedKeys={'1'}
      onChange={(e) => console.log(e)}
      items={[
        {
          key: '1',
          icon: <EllipsisOutlined />,
          label: 'All Category',
          title: null,
          onClick: () => {
            // router.push('/');
          },
        },
        {
          key: '2',
          icon: <DesktopOutlined />,
          label: 'Personal Computer',
          title: null,
          onClick: () => {
            // router.push('/catalog/Computer');
          },
        },
        {
          key: '3',
          icon: <LaptopOutlined />,
          label: 'Laptop',
          title: null,
          onClick: () => {
            // router.push('/catalog/Laptop');
          },
        },
      ]}
    />
  );
};

export default Sidebar;
