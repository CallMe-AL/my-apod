import React, { useState, useEffect } from 'react';
import useGetDate from '../Hooks/useGetDate';
import { BASE_API_URL } from '../utils/constants';
import NasaObj from '../NasaObj';
import Info from '../Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Single = () => {

  const [apod, setApod] = useState(null);
  const [err, setErr] = useState(null);
  const [todaysDate, setTodaysDate] = useState('');
  const [userDate, setUserDate] = useState(null);
  const [loading, setLoading] = useState('');

  // importing font awesome icons
  library.add(faChevronLeft, faChevronRight);

  useEffect(() => {
    const singleDay = localStorage.getItem('singleDay');

    if (singleDay) {
      // setting the max date
      let date = new Date();
      const today = useGetDate(date);
      setTodaysDate(today);
      // retrieving the previously set single day
      const obj = JSON.parse(singleDay);
      setUserDate(obj.date);
      setApod(obj);
    } else {
      let date = new Date();
      const today = useGetDate(date);
      setTodaysDate(today);
      setUserDate(today);
    }

  }, []);

  const handleDate = (e) => {
    e.preventDefault();
    setLoading('Loading...');
    getPhoto(userDate);
    setUserDate(userDate);
    console.log('user: ', userDate);
    console.log('today: ', todaysDate);
  }

  const increaseDay = () => {
    // comma separating date to play with in date object
    let newCurrentDate = userDate.replaceAll('-', ', ');
    newCurrentDate = new Date(newCurrentDate);
    // adding a day's worth of milliseconds to add to the current date
    let endDate = new Date(newCurrentDate.getTime() + (60 * 60 * 24 * 1000))
    // hyphenating so date format can be sent to NASA's database
    endDate = endDate.getFullYear() + "-" + returnMonth(endDate) + "-" + returnDate(endDate);
    getPhoto(endDate);
    setUserDate(endDate);
  }

  const decreaseDay = () => {
    // comma separating date to play with in date object
    let newCurrentDate = userDate.replaceAll('-', ', ');
    newCurrentDate = new Date(newCurrentDate);
    // adding a day's worth of milliseconds to add to the current date
    let endDate = new Date(newCurrentDate.getTime() - (60 * 60 * 24 * 1000))
    // hyphenating so date format can be sent to NASA's database
    endDate = endDate.getFullYear() + "-" + returnMonth(endDate) + "-" + returnDate(endDate);
    getPhoto(endDate);
    setUserDate(endDate);
  }

  const getPhoto = (date) => {
    setLoading('Loading...');
    fetch(`${BASE_API_URL}/api/single-img?date=${date}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      // if a status code other than 200 is sent back
      if (data.error) {
        setLoading('');
        setApod(null);
        setErr(data.error);
      } else {
        setLoading('');
        setApod(data);
        setErr(null);
        localStorage.setItem('singleDay', JSON.stringify(data));
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  function returnDate(date) {
    let today = date.getDate();

    if (today < 10) {
      today = `0${today}`;
    }

    return today;
  };

  function returnMonth(date) {
    let month = date.getMonth() + 1;

    if (month < 10) {
      month = `0${month}`;
    }

    return month;
  };

  return (
    <div className='single-div'>
      <header className='single-header'>
        <h1>Single APOD</h1>
        <p>Select a single date or scroll with the buttons</p>
      </header>
      <div className="single-form-wrap">
        <form>
          <div className="start-container">
            <label htmlFor="single-date">Your date 
            (earliest date: 06-16-1995): </label>
            <input type="date" id="single-date" name="single-date" min="1995-06-16" max={todaysDate} value=  {userDate ? userDate : todaysDate} required='required' onChange={(e) => setUserDate(e.target.value)}/>
          </div>   

          <button className="update-btn" onClick={handleDate}>Update picture</button>
        </form>
      </div>
      <div className="ui-text">{err 
        ? <div className="error-text">{err}</div> 
        : <div className="loading-text">{loading}</div>
      }
      </div>
      
      
      <div className="single-banner">
        <h2>{apod ? apod.title : 'Choose an image'}</h2>
        <p>{apod && apod.date}</p>
      </div>

      {apod && <NasaObj apod={apod} />}
      {apod && 
        <div className="single-nav">
          {/* hides button if on the earliest date */}
          {userDate !== '1995-06-16' && 
            <button className="previous-day" aria-label='go back a day' onClick={decreaseDay}>
              <FontAwesomeIcon icon={faChevronLeft} className="single-nav-icon-left" />
              Previous
            </button>        
          }
          {/* hides button if on today's date */}
          {userDate !== todaysDate &&
            <button className="next-day" aria-label='go forward a day' onClick={increaseDay}>
              Next
              <FontAwesomeIcon icon={faChevronRight} className="single-nav-icon-right" />
            </button>        
          }
        </div>      
      }

      {apod && <Info apod={apod} />}
    </div>
  )
}

export default Single