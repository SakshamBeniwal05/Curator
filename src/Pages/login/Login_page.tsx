import React, { useRef, useState } from 'react'
import Input from "../../assets/input/Input"
import './Login.css'
import Button from '../../assets/button/Button'
import useSpotlight from '../../utilities/useSpotlight'
import AuthServices from '../../Services/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Login } from '../../Redux/slices/Log_status'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../../assets/error pop-up/popup'

interface Position {
  x: number;
  y: number;
}

interface FormData {
  email: string;
  password: string;
}

interface ErrorData {
  code?: string;
  message?: string;
  [key: string]: any;
}

const Login_page: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y }: Position = useSpotlight(ref);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>()
  const [Error, setError] = useState<boolean>(false)
  const [ErrorData, setErrorData] = useState<ErrorData | null>(null)

  const Trigger_login = async (data: FormData): Promise<void> => {
    const session = await AuthServices.Login(data)
    if (session) {
      const userdata = await AuthServices.Current_User();
      if (userdata?.code) {
        setError(true)
        setErrorData(userdata)
      }
      else {
        dispatch(Login({ data: userdata }))
        navigate('/')
        window.localStorage.setItem("user", JSON.stringify(userdata));
        window.localStorage.setItem("session", JSON.stringify(session));
      }
    }
    else {
      console.log('creation_error')
    }
  }

  return (
    <>
      {Error && (
        <div id='error_appear_zone'>
          <Popup prop={ErrorData} onClose={() => {
            setError(false)
            setErrorData(null)
          }} />
        </div>
      )}
      <div
        id="error_blured_bg"
        style={Error ? { filter: 'blur(10px)' } : {}}>
        <div
          id='login-form'
          ref={ref}
          style={{
            '--x': `${x}px`,
            '--y': `${y}px`
          } as React.CSSProperties}>
          <header>
            <h3>Login</h3>
            <span>Enter your credentials to access your account</span>
          </header>
          <div className='form-divider'></div>
          <main>
            <form onSubmit={handleSubmit(Trigger_login)}>
              <div className='form-group'>
                <Input label="E-mail" placeholder='name@example.com' {...register('email', { required: true })} />
              </div>
              <div className='form-group'>
                <Input label="Password" type='password' {...register('password', { required: true })} />
              </div>
              <div className='form-group'>
                <Button color='true' type='submit' width='22rem' work='Submit' />
              </div>
            </form>
            <footer className='foot_login'>
              Don't Have Account? <Link id='signup_login' to={'/signup'}>Sign Up</Link>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login_page;   