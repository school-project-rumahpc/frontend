import { Button, Drawer } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TokenUtil } from '../utils/token';

TokenUtil.loadToken();

const UserInfo = () => {
  const router = useRouter();

  const user = TokenUtil.decodedToken();
  console.log(user);

  const logOut = () => {
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    router.push('/');
  };
  return (
    <div>
      <h2>Username : {user.username}</h2>
      <h4><i>Phone Number :</i> {user.phone}</h4>
      <h4><i>Email  :</i> {user.email}</h4>
      <Button
        style={{marginTop: '15px' }}
        size='small'
        type='ghost'
        danger
        onClick={logOut}
      >
        Log Out
      </Button>
    </div>
  );
};

const UserDrawer = ({ drawerClose, open }) => {
  return (
    <Drawer title='User Information' placement='right' onClose={drawerClose} open={open}>
      {TokenUtil.accessToken ? (
        <UserInfo />
      ) : (
        <Link href={'/'}>
          <a>You're not logged in, please login.</a>
        </Link>
      )}
    </Drawer>
  );
};

export default UserDrawer;
