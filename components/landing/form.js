import { Alert, AutoComplete, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { appConfig } from '../../config/appConfig';
import Styles from '../../styles/home.module.css';
import { antdCustom } from '../../utils/antdCustom';
import { http } from '../../utils/http';

//err submit handler
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const [msg, setMsg] = useState(null);
  const onLogin = (values) => {
    // console.log(values);
    const res = http.auth(appConfig.logInUrl, values);
    res.end((err,res)=>{
      if(err && err.response.body.message){
        setMsg(err.response.body.message)
        return
      }
      // TODO: set jwt to local storage
      console.log(res)
    })
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
        <Input.Password autoComplete='off' placeholder='Password' />
      </Form.Item>
      <Form.Item style={{marginTop:'20px'}}>
        <Button size='middle' type='primary' htmlType='submit' shape='round'>
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

const Register = () => {
  const [msg, setMsg] = useState(null);

  const onRegister = (values) => {
    // console.log(values);
    const res = http.auth(appConfig.registerUrl, values);
    res.end((err,res)=>{
      if(err && err.response.body.message){
        setMsg(err.response.body.message)
        return
      }
      // TODO: show message to user via msg
      console.log(res)
    })
  };

  const [options, setOptions] = useState([]);
  const handleDropdown = (value) => {
    let optList = [];
    if (!value || value.indexOf('@') >= 0) {
      optList = [];
    } else {
      optList = ['gmail.com', 'yahoo.com','outlook.com'].map((domain) => ({
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
        <Input  placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='email'
        label='Email'
        rules={[{ required: true }, { type: 'email' }]}
      >
        <AutoComplete options={options} onChange={handleDropdown}>
          <Input  placeholder='yourMail@email.com' />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input.Password  placeholder='Password' />
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
        <Input  placeholder='08xxx-xxxx-xxxx' />
      </Form.Item>
      <Form.Item style={{marginTop:'20px'}}>
        <Button size='middle' type='primary' htmlType='submit' shape='round'>
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
  const [onLogin, setLogin] = useState(true);
  return (
    <div className={Styles['form-container']}>
      <section className={Styles['header-container']}>
        <a onClick={() => setLogin(true)}>
          <h2
            tabIndex={0}
            className={onLogin ? Styles['focus'] : Styles['not']}
          >
            Login
          </h2>
        </a>
        <a  onClick={() => setLogin(false)}>
          <h2
            tabIndex={0}
            className={onLogin ? Styles['not'] : Styles['focus']}
          >
            Register
          </h2>
        </a>
      </section>
      {onLogin ? <Login /> : <Register />}
    </div>
  );
};

export default FormPage;
