import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fb-stuff/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useAuthValue } from '../AuthContext';

const Register = () => {

  const { setTimeActive } = useAuthValue();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassWord, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const validateUsername = () => {

    if (username.length < 1) {
      setError('Username cannot be empty');
      return false;
    }
    if (username.length > 1 && username.length < 16) {
      return true;
    } else {
      setError('Username must be less than 16 letters');
      return false;
    }
  }

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassWord !== '') {
      if (password !== confirmPassWord) {
        isValid = false;
        setError('Passwords do not match');
      }
    }
    return isValid;
  }

  const register = e => {
    e.preventDefault();
    setError('');
    if (!validateUsername) return;
    if (validatePassword()) {
      // create a new user with email and pw using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser);
          updateProfile(auth.currentUser, {
            displayName: username
          });
        })
        .then(() => {
          setTimeActive(true);
          navigate('/verify-email');
        })
        .catch(err => setError(err.message))
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className='register-wrap'>
      <div className='__inner-wrap'>
        <div className="main-headers">
          <h1>Sign Up with MyAPOD</h1>
          <p>Become More Connected With Space</p>
        </div>
        {error && <div className='auth-error'>{error}</div>}
        <form onSubmit={register} name="registration-form" className='sign-up-form'>
          <label htmlFor='user'>Username</label>
          <input 
            type="text"
            name="user"
            value={username}
            placeholder="Must be less than 16 characters"
            required
            onChange={e => setUsername(e.target.value)} 
          />
          <label htmlFor='email'>Email</label>
          <input 
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)} 
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            required
            onChange={e => setPassword(e.target.value)} 
          />
          <label htmlFor="confirmation">Confirm Password</label>
          <input 
            type="password"
            name="confirmation"
            value={confirmPassWord}
            placeholder="Confirm password"
            required
            onChange={e => setConfirmPassword(e.target.value)} 
          />
          <p>We use Google's Firebase to register accounts. <br />Learn more about <a href="https://firebase.google.com/">Firebase</a>!</p>
          <button type='submit' className='sign-up-btn'>Sign Up</button>
        </form>        
      </div>
    </div>
  )
}

export default Register