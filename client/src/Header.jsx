import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <header>
      <div className="header-wrap">
        <button className="mobile-nav-toggle" 
                aria-controls="primary-navigation"
                aria-expanded={open ? "true" : "false"}
                onClick={() => toggleNav()}>
          <div className="sr-only">Menu</div>
          {open ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>} 
        </button>
        <div className='logo-container'>
          <Link to="/" className='logo'>my<span>APOD</span></Link>
        </div>        
        <nav id="primary-navigation" data-visible={open ? 'true' : 'false'}>
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