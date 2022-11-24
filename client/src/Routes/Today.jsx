import { useEffect, useState } from 'react';
import useGetDate from '../Hooks/useGetDate';
import useGetTodaysAPOD from '../Hooks/useGetTodaysAPOD';
import NasaObj from '../NasaObj';
import Info from '../Info.jsx';
import FavoriteButton from '../FavoriteButton';
import { useAuthValue } from '../AuthContext';

const Today = () => {

  const { isLoggedIn } = useAuthValue();

  const [apod, setApod] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {

    if (!apod) return;
    setLoading(true);

  }, [apod]);

  return (
    <div className='today-wrap'>
      <h1>{apod?.title}</h1>
      <div className={`subhead-wrap ${isLoggedIn ? 'space-between' : ''}`}>
        <p className='current-date'>Date (year/month/day): {apod?.date}</p>
        { isLoggedIn && <FavoriteButton apod={apod} /> }     
      </div>

      {
        err
        ? err
        : <NasaObj apod={apod} loading={loading} />
      }
      

      {apod && <Info apod={apod} />}
    </div>
  )
}

export default Today
