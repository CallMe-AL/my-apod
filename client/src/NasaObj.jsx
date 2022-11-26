import React, { useState } from "react";
import Modal from './Modal.jsx';
import Loading from './Loading';

const NasaObj = ({ apod, changing, loading }) => {

  const [open, setOpen] = useState(false);

  const openModal = () => {
    if (open) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    } else {
      setOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  return (
    <div className="apod-obj">

      {
        loading
          ? <Loading />
          : apod?.media_type === 'image' 
              ? <img className={`apod-img absolute ${changing ? 'changing' : ''}`} src={apod?.url} alt={apod?.title} onClick={() => openModal()}/>
              : <iframe title="nasa's astronomy picture of the day video" className={`apod-video absolute ${changing ? 'changing' : ''}`} src={apod?.url} />        
      }  
      
      <Modal apod={apod ? apod : undefined} open={open} setOpen={setOpen} />
    </div>
  )
}

export default NasaObj
