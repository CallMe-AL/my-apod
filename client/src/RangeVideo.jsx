import { useState, useEffect } from 'react';

const RangeVideo = ({ apod, index, setActiveItem, activeItem, setActiveApod }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className="multi-apod-video">
      <p className="apod-date">{apod.date}</p>
      <div className="video-container">
        <iframe src={apod.url} frameBorder="0" className="apod-video"></iframe>
        <div className={showInfo ? 'apod-info visible' : 'apod-info'}>
          <h2>About this video</h2>
          <p className="apod-explanation">{apod.explanation}</p>
          {apod.copyright && <p className="apod-copyright"><span>Copyright: </span>{apod.copyright}</p>}
          <a href={apod.url} className="apod-url">Click to open image in window</a>
        </div>
      </div>
      <div className="apod-bottom-container">
        <p className="apod-title">{apod.title}</p>
        <button className="info-btn" onClick={setShow}>Info</button>
      </div>
    </div>
  )
}

export default RangeVideo
