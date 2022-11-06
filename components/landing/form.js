import { useState } from 'react';
import { Button, Form, Input, AutoComplete } from 'antd';
import Styles from '../../styles/home.module.css';
// import LogApi from '../../pages/api/auth/login';
// import RegApi from '../../pages/api/auth/register';

// const Register = () => {
//   const [show, setShow] = useState(true);
//   const [msg,setMsg] = useState()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit= async ({username,phone,email,password}) => {
//       const res = await RegApi(email,password,phone,username)
//       setMsg(res)
//   };

//   return (
//     <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor='username'>Username</label>
//       <input
//         type='text'
//         id={Styles.user}
//         placeholder='Username'
//         autoComplete='off'
//         {...register('username', {
//           required: 'Username Required',
//           minLength: { value: 3, message: 'Must be 3 letter length or more' },
//         })}
//       />
//       {errors.username && (
//         <p className={Styles.error}>{errors.username.message}</p>
//       )}
//       <label htmlFor='phone'>Phone Number</label>
//       <input
//         type='tel'
//         id={Styles.phone}
//         placeholder='0812-3456-789'
//         autoComplete='off'
//         {...register('phone', {
//           required: 'Phone number required',
//           pattern: {
//             value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
//             message: 'Format incorrect',
//           },
//         })}
//       />
//       {errors.phone && <p className={Styles.error}>{errors.phone.message}</p>}
//       <label htmlFor='email'>Email</label>
//       <input
//         type='text'
//         id={Styles.email}
//         placeholder='Yourmail@email.com'
//         autoComplete='off'
//         {...register('email', {
//           required: 'Email required',
//           pattern: {
//             value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//             message: 'Format incorrect',
//           },
//         })}
//       />
//       {errors.email && <p className={Styles.error}>{errors.email.message}</p>}
//       <label htmlFor='password'>Password</label>
//       <input
//         type={show ? 'password' : 'text'}
//         id={Styles.password}
//         placeholder='Password'
//         autoComplete='off'
//         {...register('password', {
//           required: 'Password required',
//           minLength: { value: 8, message: 'Must be 8 letter length or more' },
//         })}
//       />
//       {errors.password && (
//         <p className={Styles.error}>{errors.password.message}</p>
//       )}
//       <span className={Styles.show}>
//         <p>Show Password</p>
//         <input type='checkbox' onClick={() => setShow(!show)} />
//       </span>
//       {/* FIXME: CHANGE TO USERNAME  */}
//       {msg?.id?<p>User Registered</p>:<p className={Styles.error}>{msg?.message}</p>}
//       <button type='submit'>Register</button>
//     </form>
//   );
// };

// const Login = () => {
//   const [show, setShow] = useState(true);
//   const [msg,setMsg] = useState()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async ({email,password}) => {
//     const res = await LogApi(email,password)
//     setMsg(res)
//     // console.log(res)
//   };

//   return (
//     <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor='email'>Email</label>
//       <input
//         type='text'
//         id={Styles.email}
//         placeholder='Yourmail@email.com'
//         autoComplete='off'
//         {...register('email', {
//           required: 'Email required',
//           pattern: {
//             value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//             message: 'Format incorrect',
//           },
//         })}
//       />
//       {errors.email && <p className={Styles.error}>{errors.email.message}</p>}
//       <label htmlFor='password'>Password</label>
//       <input
//         type={show ? 'password' : 'text'}
//         id={Styles.password}
//         placeholder='Password'
//         autoComplete='off'
//         {...register('password', { required: 'Password required' })}
//       />
//       {errors.password && (
//         <p className={Styles.error}>{errors.password.message}</p>
//       )}
//       <span className={Styles.show}>
//         <p>Show Password</p>
//         <input type='checkbox' onClick={() => setShow(!show)} />
//       </span>
//       {msg?.statusCode?<p className={Styles.error}>{msg?.message}</p>:<p>{msg?.message}</p>}
//       <button type='submit'>Login</button>
//     </form>
//   );
// };

// const [form] = Form.useForm();

const Register = () => {
  //autocomplete for emails
  const [options,setOptions] = useState([])
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
  //submit handler
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  //err submit handler
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //custom validate message
  const validateMessage = {
    required: 'Please fill in the ${label}',
    types: { email: '${label} invalid!' },
  };
  return (
    <Form
      // className={Styles.form}
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
        <AutoComplete  options={options} onChange={handleChange}>
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true }]}
      >
          <Input.Password />
      </Form.Item>
      <Form.Item >
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
      {onLogin ? null /*<Login />*/ : <Register />}
    </div>
  );
};

export default FormPage;
