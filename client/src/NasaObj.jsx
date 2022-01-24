import { useState } from "react";
import Modal from './Modal.jsx';

const NasaObj = (props) => {

  const [open, setOpen] = useState(false);

  const obj = props.apod;

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
      {obj.media_type === 'image' 
        ? <img className="apod-img" src={obj.url} alt={obj.title} onClick={() => openModal()}/>
        : <iframe className="apod-video" src={obj.url} />}
      <Modal apod={obj} open={open} setOpen={setOpen} />
    </>
  )
}

export default NasaObj
