import { useState, useEffect } from "react";
import InfoDiv from "../InfoDiv";
import useGetDate from "../Hooks/useGetDate";
import RangeImage from '../RangeImage.jsx';
import RangeVideo from '../RangeVideo.jsx';
import { BASE_API_URL } from '../utils/constants';
import JumpToTopBtn from '../JumpToTopBtn';

// daypicker stuff
import { sub, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../Styles/dayPicker.css';

const Apodrange = () => {

  let now = new Date();
  let date = useGetDate(now);

  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [today, setToday] = useState('');
  const [loading, setLoading] = useState('');
  const [warning, setWarning] = useState(null);
  const [apods, setApods] = useState(null);
  const [activeItem, setActiveItem] = useState('');
  const [activeApod, setActiveApod] = useState(null);

  // date picker stuff
  let default_range = {
    from: sub(now, {
      weeks: 1
    }),
    to: now
  }
  const [range, setRange] = useState(default_range);
  const [month, setMonth] = useState(new Date()); // reminder: month set by whole date, not just getMonth()
  const earliest_date = new Date(1995, 5, 16);

  useEffect(() => {
    setToday(date);
    setWarning('');

    let currentRange = sessionStorage.getItem('current-range');
    
    if (currentRange) {
      setApods(JSON.parse(currentRange));
      let endDate = sessionStorage.getItem('end-date') || date;
      let startDate = sessionStorage.getItem('start-date');
      console.log(startDate)
      let new_end = new Date(endDate + 'T23:00:00.000');
      let new_start = new Date(startDate + 'T23:00:00.000');
      let range_obj = {
        from: new_start,
        to: new_end
        
      };
      setRange(range_obj);
      setMonth(new_start);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, []);

  useEffect(() => {

    if (!range) {
      setStartDate(null);
      setEndDate(null);   
    }

    if (range?.from) {
      setEndDate(null);
      const start = useGetDate(range.from);
      setStartDate(start);
      if (range.to) {    
        console.log('to: ', range.to)    
        const end = useGetDate(range.to);        
        setEndDate(end);         
      }
    }
    
  }, [range]);

  // function convertDateToMs(value) {
  //   let newDate = new Date(value);
  //   let dateInMs = newDate.getTime();
  //   return dateInMs;
  // }

  // function handleStartDate(e) {
  //   let value = e.target.value;
  //   let valueInMs = convertDateToMs(value);
  //   let endInMs = convertDateToMs(endDate);

  //   // date checks for browsers that don't support min/max attributes for date picker
  //   if (valueInMs > now.getTime()) {
  //     setWarning('The start date can\'t be a date later than today... yet...');
  //     return;
  //   } else if (valueInMs > endInMs) {
  //     setWarning('The start date can\'t be later than the end date, silly!');
  //     return;
  //   }
  //   setStartDate(value);
  //   sessionStorage.setItem('start-date', value);
  // }

  // function handleEndDate(e) {
  //   let value = e.target.value;
  //   let valueInMs = convertDateToMs(value);
  //   let startInMs = convertDateToMs(startDate);

  //   // date checks for browsers that don't support min/max attributes for date picker
  //   if (valueInMs > now.getTime()) {
  //     setWarning('The end date can\'t be a date later than today... yet...');
  //     return;
  //   } else if (valueInMs < startInMs) {
  //     setWarning('The end date can\'t be earlier than the start date, silly!');
  //     return;
  //   }

  //   setEndDate(value);
  //   sessionStorage.setItem('end-date', value);
  // }

  const getPictures = (e) => {
    e.preventDefault();
    if (startDate === '' || endDate === '' || endDate === null) {
      setWarning('Please select a start and end date!');
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

    setLoading('Loading... wider ranges may take a bit longer...');
    setWarning('');

    const query = `?start_date=${startDate}&end_date=${endDate}`;

    fetch(`${BASE_API_URL}/api/range-imgs` + query, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      // if nasa's servers are having issues
      if (data.error) {
        setLoading(data.error);
      } else {
        setLoading('');
        setApods(data);
        sessionStorage.setItem('current-range', JSON.stringify(data));
        sessionStorage.setItem('start-date', startDate);
        sessionStorage.setItem('end-date', endDate);
      }
      
    })
    .catch(err => console.log(err));
    
  }

  // date picker footer
  let footer = (
    <>
      <p className='footer-styles earliest-date'>Earliest date: 06-16-1995</p>
      <p className="footer-styles current-range">Current range: 
        <span> {range?.from ? format(range?.from, 'PPP') : 'nothing yet!'}</span>
        <span>{range?.to ? ' - ' + format(range.to, 'PPP') : ''}</span>
      </p>
    </>
  );

  return (
    <div className="range-div">
      <div className="selection-div">
        <header className="selection-header">
          <h1>Select your range:</h1>
          <p className='max-range'>Max range: 60 days (so far...)</p>
        </header>    
        <div className="date-div">
          {/* <form>
            <div className="start-container">
              <label htmlFor="start">Start date 
              (earliest date: 06-16-1995): </label>
              <input type="date" id="start" name="apod-start" min="1995-06-16" max={endDate ? endDate : today} value={startDate} onChange={handleStartDate}/>
            </div>
            
            <div className="end-container">
              <label htmlFor="end">End date: </label>
              <input type="date" id="end" name="apod-end" min={startDate ? startDate : '1995-06-17'} max={today} value={endDate} onChange={handleEndDate}/>
            </div>            
            
          </form> */}
          <DayPicker
            mode='range'
            max={60}
            selected={range}
            onSelect={setRange}
            month={month}
            onMonthChange={setMonth}
            footer={footer}
            fromDate={earliest_date}
            toDate={new Date()}
            captionLayout='dropdown'
            fixedWeeks
          />
        </div>
        <button className="update-btn" onClick={getPictures}>Update pictures</button>
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
          {apods && <InfoDiv activeApod={activeApod} /> }
        </aside>
      </div>
      <JumpToTopBtn />
    </div>
  )
}

export default Apodrange
