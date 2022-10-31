import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Styles from '../../../styles/home.module.css';
import LogApi from '../../api/auth/login';
import RegApi from '../../api/auth/register';

interface data {
  username: string;
  phone: string;
  email: string;
  password: string;
}

const Register = () => {
  const [show, setShow] = useState(true);
  const [msg,setMsg] = useState<{id:string,message:string}>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<data>();

  const onSubmit: SubmitHandler<data> = async ({username,phone,email,password}) => {
      const res = await RegApi(email,password,phone,username)
      setMsg(res)
      // console.log(res)
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id={Styles.user}
        placeholder='Username'
        autoComplete='off'
        {...register('username', {
          required: 'Username Required',
          minLength: { value: 3, message: 'Must be 3 letter length or more' },
        })}
      />
      {errors.username && (
        <p className={Styles.error}>{errors.username.message}</p>
      )}
      <label htmlFor='phone'>Phone Number</label>
      <input
        type='tel'
        id={Styles.phone}
        placeholder='0812-3456-789'
        autoComplete='off'
        {...register('phone', {
          required: 'Phone number required',
          pattern: {
            value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
            message: 'Format incorrect',
          },
        })}
      />
      {errors.phone && <p className={Styles.error}>{errors.phone.message}</p>}
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id={Styles.email}
        placeholder='Yourmail@email.com'
        autoComplete='off'
        {...register('email', {
          required: 'Email required',
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Format incorrect',
          },
        })}
      />
      {errors.email && <p className={Styles.error}>{errors.email.message}</p>}
      <label htmlFor='password'>Password</label>
      <input
        type={show ? 'password' : 'text'}
        id={Styles.password}
        placeholder='Password'
        autoComplete='off'
        {...register('password', {
          required: 'Password required',
          minLength: { value: 8, message: 'Must be 8 letter length or more' },
        })}
      />
      {errors.password && (
        <p className={Styles.error}>{errors.password.message}</p>
      )}
      <span className={Styles.show}>
        <p>Show Password</p>
        <input type='checkbox' onClick={() => setShow(!show)} />
      </span>
      {/* CHANGE TO USERNAME  */}
      {msg?.id?<p>User Registered</p>:<p className={Styles.error}>{msg?.message}</p>}
      <button type='submit'>Register</button>
    </form>
  );
};

const Login = () => {
  const [show, setShow] = useState(true);
  const [msg,setMsg] = useState<{message:string,statusCode:number}>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<data>();

  const onSubmit: SubmitHandler<data> = async ({email,password}) => {
    const res = await LogApi(email,password)
    setMsg(res)
    // console.log(res)
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id={Styles.email}
        placeholder='Yourmail@email.com'
        autoComplete='off'
        {...register('email', {
          required: 'Email required',
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Format incorrect',
          },
        })}
      />
      {errors.email && <p className={Styles.error}>{errors.email.message}</p>}
      <label htmlFor='password'>Password</label>
      <input
        type={show ? 'password' : 'text'}
        id={Styles.password}
        placeholder='Password'
        autoComplete='off'
        {...register('password', { required: 'Password required' })}
      />
      {errors.password && (
        <p className={Styles.error}>{errors.password.message}</p>
      )}
      <span className={Styles.show}>
        <p>Show Password</p>
        <input type='checkbox' onClick={() => setShow(!show)} />
      </span>
      {msg?.statusCode?<p className={Styles.error}>{msg?.message}</p>:<p>{msg?.message}</p>}
      <button type='submit'>Login</button>
    </form>
  );
};

const Form: NextPage = () => {
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

export default Form;
