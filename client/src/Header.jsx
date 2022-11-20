import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthValue } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './fb-stuff/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  const { isLoggedIn, setIsLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setMobileOpen(false);
    }

  }, [isLoggedIn]);

  const toggleNav = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
    } else {
      setMobileOpen(false);
    }
  }

  const signUserOut = () => {
    signOut(auth);
    setIsLoggedIn(false);
    navigate('/logout');
  }

  return (
    <header className='main-header'>
      <div className="header-wrap">
        <div className='logo-container'>
          <Link to="/" className='logo'>my<span>APOD</span></Link>
        </div> 
        <button className={`mobile-nav-toggle ${mobileOpen ? 'open' : 'close'}` }
                aria-controls="primary-navigation"
                aria-expanded={mobileOpen ? "true" : "false"}
                onClick={() => toggleNav()}>
          <div className="sr-only">Menu</div>
          {/* {open ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}  */}
          <div className="top-bar"></div>
          <div className="middle-bar"></div>
          <div className="bottom-bar"></div>
        </button>     
        <nav className="primary-navigation" data-visible={mobileOpen}>
          <ul className='main-links'>
            <li>
              <NavLink
                to="/today"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined  
                }
                onClick={() => toggleNav()}
              >
                Today
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/single"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined  
                }
                onClick={() => toggleNav()}
              >
                Single
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/range"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined  
                }
                onClick={() => toggleNav()}
              >
                Range
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined  
                }
                onClick={() => toggleNav()}
              >
                About
              </NavLink>
            </li>
          </ul>
          <ul className='account-links'>
            {
              isLoggedIn              
              ? <>
                  <li>
                    <NavLink
                      to="/profile/favorites"
                      className={({ isActive }) => 
                        isActive ? 'active-link' : undefined  
                      }
                      onClick={() => toggleNav()}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button className="sign-out" aria-label='sign out button' onClick={signUserOut}>
                      <FontAwesomeIcon icon={faRightFromBracket} className='sign-out-icon'/>
                    </button>
                  </li>
                </>
              : <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => 
                        isActive ? 'active-link' : undefined  
                      }
                      onClick={() => toggleNav()}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => 
                        isActive ? 'register-active' : undefined  
                      }
                      onClick={() => toggleNav()}
                    >
                      <span>Register</span>
                    </NavLink>
                  </li>
                </>
            }
          </ul>
        </nav>

        </div>
      </header>
  )
}

export default Header