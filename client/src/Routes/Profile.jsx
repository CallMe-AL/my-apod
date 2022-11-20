import React from 'react';
import { useAuthValue } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../fb-stuff/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import JumpToTopBtn from '../JumpToTopBtn';
import { Outlet, NavLink } from 'react-router-dom';

const Profile = () => {  

  const { currentUser } = useAuthValue();

  return (
    <div className='profile-wrap'>
      <div className="__inner-wrap">
        <h1>Profile</h1>
        <p className="username">{currentUser?.displayName}</p>
        <p className={`email ${currentUser?.emailVerified && 'verified'}`}>{currentUser?.email} {currentUser?.emailVerified && <span className='verified-icon'><FontAwesomeIcon icon={faCheckCircle} /></span>}</p>
        <nav className='profile-nav'>
          <ul>
            <li>
              <NavLink 
                to="favorites" 
                className={({ isActive }) => 
                            isActive ? 'active-link' : undefined  
                          }
              >Favorites
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="options"
                className={({ isActive }) => 
                            isActive ? 'active-link' : undefined  
                          }
              >Account Options
              </NavLink>
            </li>
          </ul>
        </nav>       
        <button className="sign-out" onClick={() => signOut(auth)}>Sign Out</button>
      </div>
      <Outlet />
      
      <JumpToTopBtn />
    </div>
  )
}

export default Profile