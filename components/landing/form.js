import { useState } from 'react';
import { Button, Form, Input, AutoComplete } from 'antd';
import Styles from '../../styles/home.module.css';
// import LogApi from '../../pages/api/auth/login';
// import RegApi from '../../pages/api/auth/register';

//TODO: move repetitive stuff to utils
//submit handler
const onFinish = (values) => {
  console.log('Success:', values);
};
//err submit handler
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
// TODO: move custom message to utils
//custom validate message
const validateMessage = {
  required: 'Please fill in the ${label}',
  types: { email: '${label} invalid!' },
  pattern: {
    mismatch: 'Invalid ${label}',
  },
};

const Login = () => {
  //NOTE: autocomplete is repetitive
  //autocomplete for emails
  const [options, setOptions] = useState([]);
  const handleChange = (value) => {
    let optList = [];
    if (!value || value.indexOf('@') >= 0) {
      optList = [];
    } else {
      optList = ['gmail.com', 'yahoo.com'].map((domain) => ({
        value: `${value}@${domain}`,
      }));
    }
    setOptions(optList);
  };
  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessage}
      size='large'
    >
      <Form.Item
        name='email'
        label='Email'
        rules={[{ required: true }, { type: 'email' }]}
      >
        <AutoComplete options={options} onChange={handleChange}>
          <Input type='email' autoComplete='off' placeholder='yourMail@email.com' />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true }]}
      >
        <Input.Password autoComplete='off' placeholder='Password' />
      </Form.Item>
      <Form.Item>
        <Button size='middle' type='primary' htmlType='submit' shape='round'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const Register = () => {
  //NOTE: autocomplete is repetitive
  //autocomplete for emails
  const [options, setOptions] = useState([]);
  const handleChange = (value) => {
    let optList = [];
    if (!value || value.indexOf('@') >= 0) {
      optList = [];
    } else {
      optList = ['gmail.com', 'yahoo.com'].map((domain) => ({
        value: `${value}@${domain}`,
      }));
    }
    setOptions(optList);
  };
  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessage}
      size='large'
    >
      <Form.Item name='username' label='Username' rules={[{ required: true }]}>
        <Input autoComplete='off' placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='email'
        label='Email'
        rules={[{ required: true }, { type: 'email' }]}
      >
        <AutoComplete options={options} onChange={handleChange}>
          <Input autoComplete='off' placeholder='yourMail@email.com' />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input.Password autoComplete='off' placeholder='Password' />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Phone Number'
        rules={[
          { required: true },
          { pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g },
          { min: 10 },
        ]}
      >
        <Input autoComplete='off' placeholder='08xxx-xxxx-xxxx' />
      </Form.Item>
      <Form.Item>
        <Button size='middle' type='primary' htmlType='submit' shape='round'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const FormPage = () => {
  const [onLogin, setLogin] = useState(true);
  return (
    <div className={Styles['form-container']}>
      <span className={Styles['header-container']}>
        <h2
          onClick={() => setLogin(true)}
          className={onLogin ? Styles['focus'] : Styles['not']}
        >
          Login
        </h2>
        <h2
          onClick={() => setLogin(false)}
          className={onLogin ? Styles['not'] : Styles['focus']}
        >
          Register
        </h2>
      </span>
      {onLogin ? <Login /> : <Register />}
    </div>
  );
};

export default FormPage;
