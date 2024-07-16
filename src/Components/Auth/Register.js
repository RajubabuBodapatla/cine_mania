import React, { useState } from 'react';
import { auth } from '../../Config/firbase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import logo from '../../Assets/Logo.png'
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopUp,setShowPopUP] = useState(false);
  const navigate = useNavigate()


  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowPopUP(true)
     
      // alert("Registration successful!");

    } catch (error) {
      console.error("Error registering:", error);
      // alert(error.message);
    }
    setTimeout(() => {
      setShowPopUP(false);
      navigate('/login')
      }
    ,3000);

  };

  return (
    <div className='form-container container'>
      <div className='text-logo'>
        <img className='logReg-logo' src={logo}></img>
        <h3>Register</h3>
      </div>

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <button
        onClick={handleRegister}> Register</button>
      <Popup open={showPopUp} onClose={() => setShowPopUP(false)} position={'center center'}>
        
          <p>Registartion Successfull</p> 
       

      </Popup>

    </div>

  );
};

export default Register;