import { useState, useEffect } from "react";
import ApodExp from "../ApodExp";
import useGetDate from "../Hooks/useGetDate";
import RangeImage from '../RangeImage.jsx';
import RangeVideo from '../RangeVideo.jsx';
import { BASE_API_URL } from '../utils/constants';
import JumpToTopBtn from '../JumpToTopBtn';

const Apodrange = () => {

  let now = new Date();
  let date = useGetDate(now);

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState('');
  const [warning, setWarning] = useState(null);
  const [apods, setApods] = useState(null);
  const [activeItem, setActiveItem] = useState('');
  const [activeApod, setActiveApod] = useState(null);

  function convertDateToMs(value) {
    let newDate = new Date(value);
    let dateInMs = newDate.getDate();
    return dateInMs;
  }

  function handleStartDate(e) {
    let value = e.target.value;
    let valueInMs = convertDateToMs(value);
    let endInMs = convertDateToMs(endDate);

    // date checks for browsers that don't support min/max attributes for date picker
    if (valueInMs > now.getDate()) {
      setWarning('The start date can\'t be a date later than today... yet...');
      return;
    } else if (valueInMs > endInMs) {
      setWarning('The start date can\'t be later than the end date, silly!');
      return;
    }
    setStartDate(value);
    sessionStorage.setItem('start-date', value);
  }

  function handleEndDate(e) {
    let value = e.target.value;
    let valueInMs = convertDateToMs(value);
    let startInMs = convertDateToMs(startDate);

    // date checks for browsers that don't support min/max attributes for date picker
    if (valueInMs > now.getDate()) {
      setWarning('The end date can\'t be a date later than today... yet...');
      return;
    } else if (valueInMs < startInMs) {
      setWarning('The end date can\'t be earlier than the start date, silly!');
      return;
    }

    setEndDate(value);
    sessionStorage.setItem('end-date', value);
    console.log(value);
  }

  const getPictures = (e) => {
    e.preventDefault();
    if (startDate === '' || endDate === '' || endDate === null) {
      setWarning('You need a start and end date!');
      return;
    }

    const end = new Date(endDate);
    const start = new Date(startDate);

    const difference = end.getTime() - start.getTime();
    const dayDiff = (difference / (1000 * 60 * 60 * 24));
    
    if (dayDiff > 60) {
      setWarning('Please lower the difference to below 60 days. (The lazy dev will allow more soon :)).');
      return;
    }

    setLoading('Loading...');
    setWarning('');

    const query = `?start_date=${startDate}&end_date=${endDate}`;

    fetch(`${BASE_API_URL}/api/range-imgs` + query, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      setLoading('');
      setApods(data);
      sessionStorage.setItem('current-range', JSON.stringify(data));
    })
    .catch(err => console.log(err));
    
  }

  useEffect(() => {
    setToday(date);

    let currentRange = sessionStorage.getItem('current-range');
    if (currentRange) {
      setApods(JSON.parse(currentRange));
      let endDate = sessionStorage.getItem('end-date') || date;
      let startDate = sessionStorage.getItem('start-date');
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, []);

  return (
    <div className="range-div">
      <div className="selection-div">
        <h1>Select your range:</h1>
        <div className="date-div">
          <form>
            <div className="start-container">
              <label htmlFor="start">Start date (earliest date: 06-16-1995): </label>
              <input type="date" id="start" name="apod-start" min="1995-06-16" max={endDate ? endDate : today} value={startDate} onChange={handleStartDate}/>
            </div>
            
            <div className="end-container">
              <label htmlFor="end">End date: </label>
              <input type="date" id="end" name="apod-end" min={startDate ? startDate : '1995-06-17'} max={today} value={endDate} onChange={handleEndDate}/>
            </div>            
            <button className="update-btn" onClick={getPictures}>Update pictures</button>
          </form>
        </div>
      </div>
      <div className="ui-text">{warning 
        ? <div className="warning-text">{warning}</div> 
        : <div className="loading-text">{loading}</div>
      }
      </div>
      <div className="main-range-content-div">
        {/* images */}
        <div className="images-cont">
          {apods 
            ? apods.map((apod, index) => {
                if (apod.media_type === 'image') {
                  return <RangeImage key={apod.date} apod={apod} index={index} activeItem={activeItem} setActiveItem={setActiveItem} setActiveApod={setActiveApod}/>
                } else if (apod.media_type === 'video') {
                  return <RangeVideo key={apod.date} apod={apod} index={index} activeItem={activeItem} setActiveItem={setActiveItem} setActiveApod={setActiveApod}/>;
                }
              })
            : 'Please select a range!'
          }</div>
        {/* images info */}
        <aside className="info-div">
          {apods && <ApodExp activeApod={activeApod} /> }
        </aside>
      </div>
      <JumpToTopBtn />
    </div>
  )
}

export default Apodrange
