import { Alert, AutoComplete, Button, Form, Input, message, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { appConfig } from '../../config/appConfig';
import styles from '../../styles/home.module.css';
import { Custom } from '../../utils/custom';
import { http } from '../../utils/http';
import { TokenUtil } from '../../utils/token';
//err submit handler
const onFinishFailed = () => {
  console.log('Submit failed');
};

const Login = () => {
  const router = useRouter();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const onLogin = (values) => {
    setLoading(true);
    const res = http.auth(appConfig.logInUrl, values);
    res
      .then(({ body }) => {
        //set jwt to local storage
        TokenUtil.setAccessToken(body.access_token);
        TokenUtil.persistToken();
        const jwt = TokenUtil.decodedToken();
        message.success(`Login Succes, welcome ${jwt.username}`);
        setLoading(false);
        router.push('/catalog');
      })
      .catch(({ response }) => {
        // error handling
        setMsg(response.body.message);
        setLoading(false);
      });
  };

  return (
    <Form
      layout='vertical'
      onFinish={onLogin}
      onFinishFailed={onFinishFailed}
      validateMessages={Custom.validateMSG}
      size='large'
    >
      <Form.Item
        name='emailOrUsername'
        label='Email or Username'
        rules={[{ required: true }]}
      >
        <Input type='text' placeholder='yourMail@email.com' />
      </Form.Item>
      <Form.Item name='password' label='Password' rules={[{ required: true }]}>
        <Input.Password autoComplete='currentPassword' placeholder='Password' />
      </Form.Item>
      <Form.Item style={{ marginTop: '20px' }}>
        <Button
          loading={loading}
          size='middle'
          type='primary'
          htmlType='submit'
          shape='round'
        >
          Log In
        </Button>
      </Form.Item>
      {msg ? (
        <Alert
          closable
          onClose={() => setMsg(null)}
          message={msg}
          type='error'
        />
      ) : null}
    </Form>
  );
};

const Register = ({ getKeyAfterReg }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onRegister = (values) => {
    setLoading(true);
    const res = http.auth(appConfig.registerUrl, values);
    res
      .then((res) => {
        message.success(`Register Success, now please login`);
        getKeyAfterReg('1');
        setLoading(false);
      })
      .catch(({ response }) => {
        setMsg(response.body.message);
        setLoading(false);
        return;
      });
  };
  const [options, setOptions] = useState([]);
  const handleDropdown = (value) => {
    let optList = [];
    if (!value || value.indexOf('@') >= 0) {
      optList = [];
    } else {
      optList = ['gmail.com', 'yahoo.com', 'outlook.com'].map((domain) => ({
        value: `${value}@${domain}`,
      }));
    }
    setOptions(optList);
  };
  return (
    <Form
      layout='vertical'
      onFinish={onRegister}
      onFinishFailed={onFinishFailed}
      validateMessages={Custom.validateMSG}
      size='large'
      autoComplete='off'
    >
      <Form.Item name='username' label='Username' rules={[{ required: true }]}>
        <Input placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='email'
        label='Email'
        rules={[{ required: true }, { type: 'email' }]}
      >
        <AutoComplete options={options} onChange={handleDropdown}>
          <Input placeholder='Email or username' />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input.Password autoComplete='currentPassword' placeholder='Password' />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Phone Number'
        rules={[
          { required: true },
          {
            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
            warningOnly: true,
          },
          { min: 10 },
          { max: 13 },
        ]}
      >
        <Input placeholder='08xxx-xxxx-xxxx' />
      </Form.Item>
      <Form.Item style={{ marginTop: '20px' }}>
        <Button
          loading={loading}
          size='middle'
          type='primary'
          htmlType='submit'
          shape='round'
        >
          Submit
        </Button>
      </Form.Item>
      {msg ? (
        <Alert
          closable
          onClose={() => setMsg(null)}
          message={msg}
          type='error'
        />
      ) : null}
    </Form>
  );
};

const FormPage = () => {
  const [activeTab, setActive] = useState('1');
  const getKeyAfterReg = (key) => {
    console.log(key);
    setActive(key);
  };
  return (
    <div className={styles['form-container']}>
      <Tabs
        activeKey={activeTab}
        onTabClick={(e) => setActive(e)}
        centered
        size='large'
        items={[
          {
            label: 'Login',
            key: '1',
            children: <Login />,
          },
          {
            label: 'Register',
            key: '2',
            children: <Register getKeyAfterReg={getKeyAfterReg} />,
          },
        ]}
      />
    </div>
  );
};
export default FormPage;
