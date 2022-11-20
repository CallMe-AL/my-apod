import React, { useState, useEffect } from 'react';
import { useAuthValue } from '../AuthContext';
import { auth, db } from '../fb-stuff/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

  const { currentUser, timeActive, setTimeActive, setIsLoggedIn } = useAuthValue();

  const [time, setTime] = useState(60);

  let navigate = useNavigate();
  const usersRef = collection(db, 'users');
  
  useEffect(() => {
    // run reload function every second until user's email has been verified
    // if so, returns to homepage
    const interval = setInterval(() => {
      currentUser?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            // we want to add a user to the database ONLY after they've verified their email
            addUserToFirestore(currentUser);
            setIsLoggedIn(true);
            navigate('/profile')
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000)
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeActive, time]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      }).catch((err) => {
        alert(err.message);
      });
  }

  const addUserToFirestore = (user) => {
    addDoc(usersRef, {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoUrl: user.photoURL,
      userId: user.uid
    })
    .catch(err => alert(err.message));
  }

  return (
    <div className='verify-wrap'>
      <div className="__inner-wrap">
        <h1>Verify Your Email Address</h1>
        <p><strong>A verification email has been sent to:</strong></p><br />
        <span className='current-user'>{currentUser?.email}</span>
        <p>Follow the instructions in the email to verify your account. You may need to check your spam folder.<br />Once verified, you'll be brought to your profile page!</p>
        <button 
          className="resend-email"
          onClick={resendEmailVerification}
          disabled={timeActive}
        >
          Resend Email {timeActive && time}
        </button>
      </div>
    </div>
  )
}

export default VerifyEmail