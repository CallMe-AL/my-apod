import React, { useState } from 'react'

const DeleteProfileModal = ({
  showModal,
  setShowModal,
  setVerifyDelete
}) => {

  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [verifyText, setVerifyText] = useState('');
  const [error, setError] = useState(false);

  const closeModal = () => {
    if (showVerifyForm) {
      setShowVerifyForm(false);
      setError(false);
    }

    setError(false);
    setShowModal(false);
  }

  const checkVerify = (e) => {
    e.preventDefault();

    if (verifyText !== 'delete') {
      setError(true);
    } else {
      setVerifyDelete(true);
      setShowModal(false);
    }
  }

  if (!showModal) {
    return (null)
  } else {
    return (
      <div className='delete-modal'>
        <div className="inner-delete-modal">
          <h1>Are you sure?</h1>
          <p>Your profile and all your favorites will be gone... forever!! <br />(Unless you decide to make another account).</p>
          {/* error for if user doesn't type delete to delete account */}
          {error ? <div className='delete-err'>Please type 'delete' to confirm, or click 'cancel' to close.</div> : <div className='delete-err'></div>}
          {
            showVerifyForm &&
              <form onSubmit={checkVerify} name='delete account form' className='verify-delete-form'>
                <label htmlFor="verify">Type "delete" to confirm, then submit</label>
                <input 
                  type="text" 
                  name='verify'
                  value={verifyText}
                  required
                  onChange={e => setVerifyText(e.target.value)}
                />
                <button className="submit-btn">Submit</button>
              </form>
          }
          <div className="btn-wrap">
            <button className="delete-btn" onClick={() => setShowVerifyForm(true)}>Delete Account</button>
            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
  
}

export default DeleteProfileModal