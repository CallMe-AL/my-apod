import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

  const [open, setOpen] = useState(false);
  const [mobileText, setMobileText] = useState('');

  const toggleNav = () => {
    if (!open) {
      setOpen(true);
      setMobileText('open');
    } else {
      setOpen(false);
      setMobileText('close');
    }
  }

  return (
    <header className='main-header'>
      <div className="header-wrap">
        <div className='logo-container'>
          <Link to="/" className='logo'>my<span>APOD</span></Link>
        </div> 
        <button className={`mobile-nav-toggle ${mobileText}` }
                aria-controls="primary-navigation"
                aria-expanded={open ? "true" : "false"}
                onClick={() => toggleNav()}>
          <div className="sr-only">Menu</div>
          {/* {open ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}  */}
          <div className="top-bar"></div>
          <div className="middle-bar"></div>
          <div className="bottom-bar"></div>
        </button>       
        <nav className="primary-navigation" data-visible={open}>
          <ul>
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
        </nav>

        </div>
      </header>
  )
}

export default Header