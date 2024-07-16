import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../Redux/authSlice";
import { signOut } from "firebase/auth";


import logo from "../Assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Config/firbase";
import Popup from "reactjs-popup";
// import Favourites from "./Favourites";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state)=>state.auth.isLogin)
  const dispatch = useDispatch();
  const [showPopUp,setShowPopUP] = useState(false)
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  

  const handleLogout = async () =>{
     await signOut(auth);

     dispatch(logout());
     setShowPopUP(true)
     setTimeout(() => {
       setShowPopUP(false);
      
     },3000);
     
  }

  const controlNavbar = () => {
  
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show")
      }
    } else {
      setShow("top")
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }
  },[lastScrollY])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if(type === 'tv'){
      navigate("/explore/tv");
    }
    else if(type === 'favourites'){
      navigate('/favourites');
      
    }
    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className="wrapper">
        <div className="logo">
          <img
            src={logo}
            alt="moive logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <ul className="menuItems">
          
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={() => navigationHandler("favourites")}>
            Favourites
          </li>

          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          {
            (!isLogin) ? <li className="menuItem" onClick={()=>navigate("/login")}>Login</li>
            : <li className="menuItem" onClick={handleLogout}>Logout</li>
            
          }
             <Popup open={showPopUp} onClose={() => setShowPopUP(false)} position={'center center'}>
        
        <p>LogOut Successfull</p> 
        </Popup>
     
          
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </div>
      {showSearch && (
        <div className="searchBar">
          <div className="wrapper">
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search movie or tv shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                className="closeIcon"
                onClick={() => {
                  setShowSearch(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;