import { useEffect, useState } from "react";
import Modal from './Modal.jsx';

const NasaObj = ({ apod, prevApod, changing }) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!prevApod) return;
    console.log('prev: ', prevApod);
  }, [prevApod]);

  const openModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  return (
    <div className="apod-obj">

      {
        apod.media_type === 'image' 
        ? <img className={`apod-img absolute ${changing ? 'changing' : ''}`} src={apod.url} alt={apod.title} onClick={() => openModal()}/>
        : <iframe title="nasa's astronomy picture of the day video" className={`apod-video absolute ${changing ? 'changing' : ''}`} src={apod.url} />
      } 

      <Modal apod={apod} open={open} setOpen={setOpen} />
    </div>
  )
}

export default NasaObj
