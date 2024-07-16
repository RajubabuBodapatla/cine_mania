import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  
} from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li  className="menuItem">About</li>
          
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Made By Raju babu More (Frontend Developer).
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a style={{ color: "white" }} href="https://github.com/RajubabuBodapatla"><FaGithub /></a>
          </span>
         
          <span className="icon">
            <a style={{ color: "white" }} href="https://www.instagram.com/gameo_007/"><FaInstagram /></a> 
          </span>
          <span className="icon">
            <a style={{ color: "white" }} href="https://x.com/gameo007"><FaTwitter /></a> 
          </span>
          <span className="icon">
            <a style={{ color: "white" }} href="https://www.linkedin.com/in/raju-babu-bodapatla-7a3000267/"><FaLinkedin /></a> 
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;