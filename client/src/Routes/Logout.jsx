import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <div className='logout-wrap'>
      <div className="__inner-wrap">
        <h1>You are currently logged out</h1>
        <h2>Thanks for visiting <strong>my</strong><span>APOD</span></h2>
        <Link to='/'>Return home</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Logout