const Modal = ({ apod, open, setOpen }) => {

  const closeModal = (e) => {
    if (!e.target.classList.contains('modal-img')) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <div className={open ? 'modal-overlay open' : 'modal-overlay'} onClick={closeModal}>
      <div className="modal-img-container">
        <img src={apod?.url} alt="" className="modal-img"/>
        <button className="close-modal-btn" aria-label="close modal button" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default Modal
