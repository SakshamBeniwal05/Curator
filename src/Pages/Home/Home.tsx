import React, { useRef, useState, useEffect } from 'react'
import './Home.css'
import Button from '../../assets/button/Button'
import useSpotlight from '../../utilities/useSpotlight'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthServices from '../../Services/auth'
import { Logout } from '../../Redux/slices/Log_status'
import Popup from '../../assets/error pop-up/popup'
import type { RootState } from '../../Redux/storage'

interface Position {
  x: number;
  y: number;
}

const Home: React.FC = () => {
  const main_ref = useRef<HTMLDivElement>(null)
  const main_position: Position = useSpotlight(main_ref)
  const status = useSelector((state: RootState) => state.status.status);
  const mid_text = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const [maskSize, setMaskSize] = useState<number>(200)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [Error, setError] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
  }, [status])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !document.getElementById('dropdown')?.contains(e.target as Node) &&
        !document.getElementById('dropdownMenu')?.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!mid_text.current) return;

    const { top, right, bottom, left } = mid_text.current.getBoundingClientRect();
    const padding = 100;

    const withinX = main_position.x >= left - padding && main_position.x <= right + padding;
    const withinY = main_position.y >= top - padding && main_position.y <= bottom + padding;

    if (withinX && withinY) {
      setMaskSize(400);
    } else {
      setMaskSize(200);
    }
  }, [main_position]);

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen((prev) => !prev)
  }

  const Triggerd_Logout = async (): Promise<void> => {
    try {
      await AuthServices.Logout()
      localStorage.removeItem('user') 
      localStorage.clear()              
      dispatch(Logout())
      setError(true)
    } catch (error) {
      console.log(error)
    }
  }

  const navigationAddpost = (): void => {
    navigate('/Addpost')
  }
  const navigationAllPost = (): void => {
    navigate('/AllPost')
  }

  return (
    <>
      {Error && (
        <div id='error_appear_zone'>
          <Popup prop={{ code: "LoL", message: "Logout Succesfully" }} onClose={() => {
            setError(false)
          }} />
        </div>
      )}
      <div
        id="error_blured_bg"
        style={Error ? { filter: 'blur(10px)' } : {}}>
        <div id='main_visible' >
          <div className='logo'>
            <Link to={'/'}>
              <svg className='hidden' id="Layer_2_Default" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 595.28 841.89" width="100" height="100">
                <polygon fill="#fff" points="324.05 142.8 531.27 263 324.05 392.59 324.05 142.8" />
                <polygon fill="#fff" points="325.77 501.99 534.4 625.48 325.77 745.22 325.77 501.99" />
                <polygon fill="#fff" points="271.46 153.75 70.5 273.95 271.46 396.03 271.46 153.75" />
                <polygon fill="#fff" points="271.46 501.21 70.5 625.8 271.46 741.85 271.46 501.21" />
                <polygon fill="#fff" points="258.16 448.78 50.62 322.47 50.62 577.9 258.16 448.78" />
              </svg>
            </Link>
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
          <div ref={mid_text} className='text_mid'>
            <h1>Your world, curated.</h1>
            <h4>Hand-pick the ideas that inspire you, and find a home for the ones you need to share.</h4>
          </div>
          {!status && (
            <div className="buttons">
              <Link to={'/login'}>
                <Button type="button" width="20vw" work="Login" bgcolor="ff6200" />
              </Link>
              <Link to={'/signup'}>
                <Button type="button" width="20vw" work="Sign Up" bgcolor="ff6200" />
              </Link>
            </div>
          )}

          <div className="links">

            <div className="github">
              <Link target="_blank" to={'https://github.com/SakshamBeniwal05?tab=repositories'}>
                <svg className=' link_logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" height="50px">    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" fill='#fff' /></svg>
              </Link>
            </div>
            <div className="linkdin">
              <Link target="_blank" to={'https://www.linkedin.com/in/saksham-beniwal-082210225/'}>
                <svg className=' link_logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" fill='#fff' /></svg>
              </Link>
            </div>
            <div className="X">
              <Link target="_blank" to={'https://x.com/SakshamBen89720'}>
                <svg className='link_logo' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50">
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" fill='#fff'></path>
                </svg>
              </Link>
            </div>
          </div>
        </div >
        <div id="main_hidden" ref={main_ref}
          style={{
            "--main_position-x": maskSize === 400 ? `${main_position.x - 200}px` : `${main_position.x - 100}px`,
            "--main_position-y": maskSize === 400 ? `${main_position.y - 200}px` : `${main_position.y - 100}px`,
            "--mask_size": `${maskSize}px`,
          } as React.CSSProperties}>
          <div className='logo'>
            <svg className='hidden' id="Layer_2_Default" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 595.28 841.89" width="100" height="100">
              <polygon fill="#fff" points="324.05 142.8 531.27 263 324.05 392.59 324.05 142.8" />
              <polygon fill="#fff" points="325.77 501.99 534.4 625.48 325.77 745.22 325.77 501.99" />
              <polygon fill="#fff" points="271.46 153.75 70.5 273.95 271.46 396.03 271.46 153.75" />
              <polygon fill="#fff" points="271.46 501.21 70.5 625.8 271.46 741.85 271.46 501.21" />
              <polygon fill="#fff" points="258.16 448.78 50.62 322.47 50.62 577.9 258.16 448.78" />
            </svg>
          </div>
          <div className='text_mid hidden_text_mid'>
            <h1>
              Beyond the algorithm, find your signal.
            </h1>
            <h4>We champion human-selected stories over automated feeds, connecting you with powerful insights a machine would miss.</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home