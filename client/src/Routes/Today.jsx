import { useEffect, useState } from 'react';
import useGetDate from '../Hooks/useGetDate';
import useGetSingleAPOD from '../Hooks/useGetSingleAPOD';
import NasaObj from '../NasaObj';

const Today = () => {

  const [apod, setApod] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);

  let date = new Date();
  const today = useGetDate(date);
  const data = useGetSingleAPOD(today);

  useEffect(() => {
    
    setApod(data);
    console.log(data);
  }, [data]);

  const showInfo = () => {
    if (openInfo) {
      setOpenInfo(false);
    } else {
      setOpenInfo(true);
    }
  }

  if (!apod) {
    return (
    <div className='today-wrap'>
      Loading...
      <div className="loader"></div>
    </div>)

  }

  return (
    <div className='today-wrap'>
      <h1>{apod.title}</h1>
      <p className='current-date'>Date (year/month/day): {apod.date}</p>
      {apod ? <NasaObj apod={apod} /> : <div className='loader'>Loading...</div>}

      <button className="info-btn" onClick={showInfo}>Show info</button>
      <div className={openInfo ? 'info-container open' : 'info-container'}>
        <h2 className="apod-title-for-info">About this image</h2>
        <p className='apod-explanation'>{apod?.explanation}</p>
        {apod.copyright && <p className='apod-copyright'><span>Copyright: </span>{apod.copyright}</p>}
        <a href={apod.url} className="apod-url">Open image in window</a>
        <button className="close-info-btn" onClick={showInfo}>Close</button>
      </div>
      <div className='desktop-info-container'>
        <h2 className="apod-about">About this image</h2>
        <p className='apod-explanation'>{apod?.explanation}</p>
        {apod.copyright && <p className='apod-copyright'><span>Copyright: </span>{apod.copyright}</p>}
        <a href={apod.url} className="apod-url">Open image in window</a>
      </div>
    </div>
  )
}

export default Today
