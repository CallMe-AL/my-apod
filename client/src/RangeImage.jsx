import { useState, useEffect } from 'react';
import Modal from './Modal';

const RangeImage = ({ apod, index, setActiveItem, activeItem, setActiveApod }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [open, setOpen] = useState(false);

  const openModal = (e) => {

    if (e.target.classList.contains('info-close-btn') || e.target.classList.contains('apod-url')) return;
    
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  // listens for change in active index
  // compares index of this apod to the currently active index
  // if they're different, close the info box
  useEffect(() => {
    if (index !== activeItem) {
      setShowInfo(false);
    }
  }, [activeItem]);

  const setShow = () => {
    
    if (showInfo) {
      setShowInfo(false);
      return;
    } 
    setActiveItem(index);
    setActiveApod(apod);
    return setShowInfo(true);
  }

  return (
      <div className="multi-img-container">
        <p className="apod-date">{apod.date}</p>
          <div className="img-container" onClick={openModal}>
            <img src={apod.url} alt={apod.title} className="apod-img" />
            <div className={showInfo ? 'apod-info visible' : 'apod-info'}>
              <h2>About this image</h2>
              <p className="apod-explanation">{apod.explanation}</p>
              {apod.copyright && <p className="apod-copyright"><span>Copyright: </span>{apod.copyright}</p>}
              <a href={apod.url} target="_blank" rel="noreferrer noopener" className="apod-url">Open image in a new window</a>
              <button className='info-close-btn' onClick={setShow}>Close</button>
            </div>
          </div>
          <div className="apod-bottom-container">
            <p className="apod-title">{apod.title}</p>
            <button className="info-btn" onClick={setShow}>Info</button>
          </div>
          <Modal apod={apod} open={open} setOpen={setOpen} />
        </div>
    
  )
}

export default RangeImage
