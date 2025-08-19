import React, { useState, useEffect, useRef } from 'react'
import UseEditor from '../../utilities/useEditor'
import Input from '../../assets/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../assets/error pop-up/popup'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../assets/button/Button'
import './Addpost.css'
import useSpotlight from '../../utilities/useSpotlight'
import AuthServices from '../../Services/auth'
import { useForm, Controller } from 'react-hook-form'
import { Logout } from '../../Redux/slices/Log_status'
import DocumentServices from '../../Services/docs'
import type { RootState } from '../../Redux/storage'

interface Position {
  x: number;
  y: number;
}

interface PostData {
  title: string;
  content: any;
  writer: string;
}

interface ErrorData {
  code?: string;
  message?: string;
  [key: string]: any;
}

const Addpost: React.FC = () => {
  const status: boolean = useSelector((state: RootState) => state.status.status);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Error, setError] = useState<boolean>(false)
  const [ErrorData, setErrorData] = useState<ErrorData | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { x, y }: Position = useSpotlight(ref)
  const { register, handleSubmit, control } = useForm<PostData>();

  const Triggerd_Logout = async (): Promise<void> => {
    try {
      await AuthServices.Logout()
      localStorage.removeItem('user')
      localStorage.clear()
      dispatch(Logout())
      setError(true)
    } catch (error) {
      console.log(error)
      // error popup
    }
  }

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
  }, [status])

  const navigationAddpost = (): void => {
    navigate('/Addpost')
  }

  const navigationAllPost = (): void => {
    navigate('/AllPost')
  }

  const Post_Post = async (data: PostData): Promise<void> => {
    if (status) {
      try {
        const userdata: any = await DocumentServices.create(data)
        setError(true)
        if (userdata?.$id) {
          setErrorData({
            code: "Blog Created",
            message: "Blog document created successfully"
          })
        } else {
          setErrorData(userdata)
        }
      }
      catch (error) {
        setError(true)
        setErrorData(error as ErrorData)
        console.log(error)
      }
    }
    console.log(data);
  }

  return (
    <div id='main_addpost'>
      {Error && (
        <div id='error_appear_zone'>
          <Popup prop={ErrorData} onClose={() => {
            setError(false)
            setErrorData(null)
          }} />
        </div>
      )}
      {status ? (
        <div style={Error ? { filter: 'blur(10px)' } : {}}>
          <div id="navbar_addpost" >
            <div className='logo'>
              <div id="back_addpost">
                <Link to="/">
                  <Button type="button" width="5vw" work="Home" bgcolor="ff6200" />
                </Link>
              </div>
              {status && (
                <div id='dropdown' onClick={handleDropdownToggle} style={{ position: 'relative' }}>
                  <svg id='menu_icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                  </svg>
                  {isDropdownOpen && (
                    <div id="dropdownMenu">
                      <Button type="button" work="Add Post" width="100%" bgcolor="ff6200" onClick={navigationAddpost} />
                      <Button type="button" work="All Post" width="100%" bgcolor="ff6200" onClick={navigationAllPost} />
                      <Button type="button" work="Logout" width="100%" bgcolor="ff6200" onClick={Triggerd_Logout} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div id='post'>
            <form onSubmit={handleSubmit(Post_Post)}>
              <div id='title'>
                <Input label="Title" placeholder='Title of the Content' style={{ width: "69vw" }} {...register('title', { required: true })} />
              </div>
              <div id='content'>
                <Input label='Content' custom_div={true} />
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <UseEditor value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              <div>
                <Input label="Writer" placeholder='@User' style={{ width: "69vw" }} {...register('writer', { required: true })} />
              </div>
              <div id="submit">
                <Button color='true' type='submit' width='22rem' work='Submit' />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div id='login-not-found' ref={ref} style={{ '--x': `${x}px`, '--y': `${y}px` } as React.CSSProperties}>
          <div id="login-not-found-msg">
            <div id="addpost_login_visible">
              <h2>Logout.</h2>
              <h3 className='h3'>
                Please Login or SignUp to access the Editor
              </h3>
            </div>
          </div>
          <div className="add_post_buttons">
            <Link to={'/login'}>
              <Button type="button" width="20vw" work="Login" bgcolor="ff6200" />
            </Link>
            <Link to={'/signup'}>
              <Button type="button" width="20vw" work="Sign Up" bgcolor="ff6200" />
            </Link>
          </div>
          <Link className='h3' style={{ textDecoration: "none", marginTop: "20px" }} to={'/'}>
            Home
          </Link>
        </div>
      )}
    </div>
  )
}

export default Addpost