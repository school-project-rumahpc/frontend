import {
  DesktopOutlined,
  EllipsisOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';

const Sidebar = (props) => {
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
          onClick: (e) => {
            props.currentKey(e.key)
          },
        },
        {
          key: '2',
          icon: <LaptopOutlined />,
          label: 'Laptop',
          title: null,
          onClick: (e) => {
            props.currentKey(e.key)
          },
        },
        {
          key: '3',
          icon: <DesktopOutlined />,
          label: 'Personal Computer',
          title: null,
          onClick: (e) => {
            props.currentKey(e.key)
          },
        },
      ]}
    />
  );
};

export default Sidebar;