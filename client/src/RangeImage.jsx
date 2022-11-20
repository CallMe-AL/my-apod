import { useState, useEffect, useRef } from 'react';
import FavoriteButton from './FavoriteButton';
import Modal from './Modal';
import { useAuthValue } from './AuthContext';

const RangeImage = ({ apod, index, setActiveItem, activeItem, setActiveApod }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);

  const imgRef = useRef(null);
  const { isLoggedIn } = useAuthValue();

  const openModal = (e) => {

    if (e.target.classList.contains('info-close-btn') || e.target.classList.contains('apod-url')) return;
    
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  useEffect(() => {

    let options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0
    }

    const loadApod = (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setLoad(true);
          obs.disconnect();
        } 
      });
    }

    let observer = new IntersectionObserver(loadApod, options);
    observer.observe(imgRef.current);
  }, []);

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
        <div className="multi-title-section">
          <p className="apod-date">{apod.date}</p>
          { isLoggedIn && <FavoriteButton apod={apod} /> }
        </div>       
        
        <div className="img-container" 
              onClick={openModal}
              ref={imgRef}>
            <img src={load ? apod?.url : undefined} alt={apod.title} className="apod-img" />
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
