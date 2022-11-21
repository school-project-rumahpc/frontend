import { Alert, AutoComplete, Button, Form, Input, message, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { appConfig } from '../../config/appConfig';
import styles from '../../styles/home.module.css';
import { antdCustom } from '../../utils/antdCustom';
import { http } from '../../utils/http';
import { TokenUtil } from '../../utils/token';

//err submit handler
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const router = useRouter();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const onLogin = (values) => {
    setLoading(true);
    const res = http.auth(appConfig.logInUrl, values);
    res.end((err, res) => {
      if (err && err.response.body.message) {
        // error handling
        console.log(err.response);
        setMsg(err.response.body.message);
        setLoading(false);
        return;
      }
      //set jwt to local storage
      TokenUtil.setAccessToken(res.body.access_token);
      TokenUtil.persistToken();
      const jwt = TokenUtil.decodedToken();
      console.log(jwt);
      message.success(`Login Succes, welcome ${jwt.username}`);
      setLoading(false);
      router.push('/catalog');
    });
  };

  return (
    <Form
      layout='vertical'
      onFinish={onLogin}
      onFinishFailed={onFinishFailed}
      validateMessages={antdCustom.validateMSG}
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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onRegister = (values) => {
    setLoading(true);
    const res = http.auth(appConfig.registerUrl, values);
    res.end((err, res) => {
      if (err && err.response.body.message) {
        setMsg(err.response.body.message);
        setLoading(false);
        return;
      }
      message.success(`Register Success, now please login`);
      // console.log(res);
      setLoading(false);
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
      validateMessages={antdCustom.validateMSG}
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
          { max: 14 },
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
  return (
    <div className={styles['form-container']}>
      <Tabs
        centered
        size='large'
        defaultActiveKey='1'
        items={[
          { label: 'Login', key: '1', children: <Login /> },
          { label: 'Register', key: '2', children: <Register /> },
        ]}
      />
    </div>
  );
};

export default FormPage;
