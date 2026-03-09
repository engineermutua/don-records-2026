import React, { useContext } from 'react'
import './LoginPage.css'
import { ManagementContext } from '../../Context/ManagementContext'
import toast,{Toaster} from 'react-hot-toast';

const LoginPage = () => {
  const {setToken}=useContext(ManagementContext);
  return (
    <>
    <Toaster/>
    <div className="login-container">
      <div className="login-header">
        <p>Welcome Back Admin</p>
      </div>
      <div className="login-body">
        <form>
          <div className="form-class">
            <input type="email" name="" id="" placeholder='Admin Email'/>
          </div>
          <div className="form-class">
            <input type="password" name="" id="" placeholder='Admin Password' />
          </div>
          <div className="form-btn">
            <button onClick={()=>(setToken(true),toast.success('Welcome Admin'))}>Login</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginPage