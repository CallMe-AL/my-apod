import { useState } from "react";
import Modal from './Modal.jsx';

const NasaObj = ({ apod }) => {

  const [open, setOpen] = useState(false);

  const openModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const closeModal = (e) => {
    if (!e.target.classList.contains('modal-img')) {
      setOpen(false);
    }
  }

  return (
    <>
      {apod.media_type === 'image' 
        ? <img className="apod-img" src={apod.url} alt={apod.title} onClick={() => openModal()}/>
        : <iframe title="nasa's astronomy picture of the day video" className="apod-video" src={apod.url} />}
      <Modal apod={apod} open={open} setOpen={setOpen} />
    </>
  )
}

export default NasaObj
