import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../fb-stuff/firebase';
import { useAuthValue } from '../AuthContext';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('') ;
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setTimeActive, setIsLoggedIn } = useAuthValue();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // if email isn't verified, head to the verify-email page
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        } else {
          // otherwise head to the homepage!
          console.log(auth.currentUser)
          setIsLoggedIn(true);
          navigate('/')
        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className='login-wrap'>
      <div className="__inner-wrap">
        <h1>Login</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} className='login-form'>
          <label htmlFor="email">Email</label>
          <input 
            type='email' 
            name='email'
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input 
            type='password'
            name='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit' className='submit'>Login</button>
        </form>
        <p>
          Don't have an account? 
          <Link to='/register'> Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login