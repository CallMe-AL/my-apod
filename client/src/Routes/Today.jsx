import { useEffect, useState } from 'react';
import useGetDate from '../Hooks/useGetDate';
import useGetTodaysAPOD from '../Hooks/useGetTodaysAPOD';
import NasaObj from '../NasaObj';
import Info from '../Info.jsx';

const Today = () => {

  const [apod, setApod] = useState(null);
  const [err, setErr] = useState(null);

  let date = new Date();
  const today = useGetDate(date);
  const data = useGetTodaysAPOD(today);

  useEffect(() => {
    if (data) {
      if (data.error) {
        setErr(data);
      } else {
        setApod(data);
      }
    }
  }, [data]);

  if (!apod) {
    return (
    <div className='today-wrap'>
      {err 
        ? err.error
        : 'Loading...'
      }
      <div className="loader"></div>
    </div>)
  }

  return (
    <div className='today-wrap'>
      <h1>{apod.title}</h1>
      <p className='current-date'>Date (year/month/day): {apod.date}</p>

      {apod ? <NasaObj apod={apod} /> : <div className='loader'>Loading...</div>}

      {apod && <Info apod={apod} />}
    </div>
  )
}

export default Today
