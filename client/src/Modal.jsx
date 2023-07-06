import React, { useEffect, useState } from 'react';

const Modal = ({ apod, open, setOpen }) => {

  const [useWidth, setUseWidth] = useState('');
  const [useHeight, setUseHeight] = useState('');

  const closeModal = (e) => {
    if (!e.target.classList.contains('modal-img')) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    }
  }

  useEffect(() => {

    if (!apod) return;
    const img = new Image();
    img.src = apod.url;
  
    img.onload = () => {
      if (img.width > 1200) {
        setUseWidth(1200);
        setUseHeight(1000)
      } else {
        setUseWidth(img.width);
        setUseHeight(img.height);
      }
    }
  }, [apod])

  return (
    <div className={open ? 'modal-overlay open' : 'modal-overlay'} onClick={closeModal}>
      <div className="modal-img-container" style={{maxWidth: useWidth && useWidth, maxHeight: useHeight && useHeight }}>
        <img src={apod?.url} alt="" className="modal-img"/>
        <button className="close-modal-btn" aria-label="close modal button" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default Modal
