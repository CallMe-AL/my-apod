import { useState, useEffect, useRef } from 'react';

const RangeVideo = ({ apod, index, setActiveItem, activeItem, setActiveApod }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const vidRef = useRef(null);

  useEffect(() => {
    if (index !== activeItem) {
      setShowInfo(false);
    }
  }, [activeItem]);

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
    observer.observe(vidRef.current);
  }, []);

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
      <div className="video-container" ref={vidRef}>
        <iframe src={load && apod.url} frameBorder="0" className="apod-video"></iframe>
        <div className={showInfo ? 'apod-info visible' : 'apod-info'}>
          <h2>About this video</h2>
          <p className="apod-explanation">{apod.explanation}</p>
          {apod.copyright && <p className="apod-copyright"><span>Copyright: </span>{apod.copyright}</p>}
          <a href={apod.url} target="_blank" rel="noreferrer noopener" className="apod-url">Open image in a new window</a>
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
