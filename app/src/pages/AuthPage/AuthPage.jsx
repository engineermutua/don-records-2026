import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import { assets } from "../../assets/assets";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  const [image,setImage]=useState(null)
  const handleClick=(e)=>{
    const image=e.target.files[0]
    setImage(image)
  }
  useEffect(()=>{},[image])
  return (
    <>
      <div className="register-container">
        <div className="register-form">
          <form action="" method="post">
            {login ? (
              <>
                <div className="input-class">
                  <label htmlFor="">Email</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                  <label htmlFor="">Password</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                    <button>Login</button>
                </div>
                <p>Don't have account?<span onClick={()=>setLogin(false)}>Register</span></p>
              </>
            ) : (
              <>
              <div id="avatar-class" className="input-class">
                  <label style={{marginLeft:"calc(20% + 30px )"}} htmlFor="">Avatar</label>
                  <br />
                  {image&&
                    image?
                    <img id="user-avatar" src={URL.createObjectURL(image)} alt="" />
                    :
                    <img id="user-avatar" src={assets.userIcon} alt="" /> 
                  }
                  {
                    image?
                    <>
                    {image.name}
                    </>
                    :
                    <input onChange={handleClick} type="file" />
                  }
                </div>
               <div className="input-class">
                  <label htmlFor="">First name</label>
                  <br />
                  <input type="text" />
                </div>
                 <div className="input-class">
                  <label htmlFor="">Last name</label>
                  <br />
                  <input type="text" />
                </div>
               <div className="input-class">
                  <label htmlFor="">Username</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                  <label htmlFor="">Phone number</label>
                  <br />
                  <input type="text" />
                </div>
              <div className="input-class">
                  <label htmlFor="">Email</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                  <label htmlFor="">Role</label>
                  <br />
                  <select name="" id="">
                    <option value="fan">Fan</option>
                    <option value="artist">Artist</option>
                    <option value="producer">Producer</option>
                  </select>
                </div>
                <div className="input-class">
                  <label htmlFor="">Password</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                  <label htmlFor="">Confirm Password</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="input-class">
                    <button>Register</button>
                </div>
                <p>Already have an account?<span onClick={()=>setLogin(true)}>Login</span></p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
