import React, { useState, useEffect } from 'react';
import DeleteProfileModal from '../DeleteProfileModal';
import { useNavigate } from 'react-router-dom';

// fb imports
import { useAuthValue } from '../AuthContext';
import { signOut, deleteUser, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../fb-stuff/firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const AccountOptions = () => {

  const [showModal, setShowModal] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { currentUser, setCurrentUser } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  useEffect(() => {
    if (!verifyDelete) return;
    
    deleteUser(currentUser).then(() => {
      deleteFromDb(currentUser.uid);
      
      // user still signed in for an hr after account deletion
      signOut(auth);
      setCurrentUser(null);

      navigate('/homepage');      
    })
    .catch(err => alert(err.message));

  }, [verifyDelete]);

  const deleteFromDb = (id) => {
    const fav_query = query(collection(db, 'fav_apods'), where("userId", "==", id));

    getDocs(fav_query)
      .then((query) => {
        query.forEach((document) => {
          deleteDoc(doc(db, "fav_apods", document.id))
        })
      })
    
    const user_query = query(collection(db, 'users'), where("userId", "==", id));
    getDocs(user_query)
      .then((query) => {
        query.forEach((document) =>{
          deleteDoc(doc(db, "users", document.id))
        })
      })
  }

  const resetPassword = () => {
    sendPasswordResetEmail(auth, currentUser.email)
      .then(() => {
        setSuccess(true);
        setTimeout(() =>{
          setSuccess(false);
        }, 60000);
      })
      .catch((err) => setError(err.message))
  }

  const toggleModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  return (
    <div className='account-wrap'>
      <DeleteProfileModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        setVerifyDelete={setVerifyDelete} 
      />
      <h2>Account options</h2>
      <div className="pw-reset-container">
        {success
          ? <p className='reset-msg'>Email sent! You may need to check your spam folder.</p>
          : <button className="reset-pw" onClick={resetPassword}>Reset Password</button>
        }
        <div className="error-msg">
          { error && error}
        </div>
      </div>
      
      <button className="delete-act" onClick={toggleModal}>Delete Account</button>

    </div>
  )
}

export default AccountOptions