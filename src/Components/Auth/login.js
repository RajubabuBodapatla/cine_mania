import React, { useState } from 'react';
import { auth } from '../../Config/firbase';
import { signInWithEmailAndPassword } from "firebase/auth";
// import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo.png'
import { useDispatch} from 'react-redux';
import { login } from '../../Redux/authSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
// import { Button } from 'bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLogin, setISLogin] = useState(false)
  const dispatch = useDispatch()
  // const isLogin = useSelector((state)=>state.auth.isLogin)
  const navigate = useNavigate()
  const [loginMsg,setLoginMsg] = useState(false)
  const [errormsg,setErrorMsg] = useState('')
  const [showPopUp,setShowPopUP] = useState(false)
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginMsg(true);
    
      setErrorMsg('');
      dispatch(login())
    } catch (error) {
      console.error("Error logging in:", error);
      // alert(error.message);
      setLoginMsg(false)
      setErrorMsg(error.message)
    }
    setShowPopUP(true)
    setTimeout(() => {
      setShowPopUP(false);
      if(loginMsg){
        navigate('/')
      }
    },3000);
    
  };


  return (

    <div className='form-container container'>
      <div className='text-logo'>
        <img className='logReg-logo' src={logo}></img>
      <h3>Login</h3>
      </div>
      
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} >Login</button>
      <Popup open={showPopUp} onClose={()=> setShowPopUP(false)} position={'center center'}>
      <div>
      {(loginMsg) ? <p>Login Successfull</p> : <p>{errormsg}</p>}
      </div>
      
      </Popup>
      
     
      <div className='toggle-container'>
        <p>Don't have an Account ? 
          <Link className='toggle-link' to={'/register'}>Register</Link>
          </p>
      </div>
     
    </div>
  );
};


export default Login