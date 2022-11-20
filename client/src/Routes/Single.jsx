import React, { useState, useEffect } from 'react';
import useGetDate from '../Hooks/useGetDate';
import { BASE_API_URL } from '../utils/constants';
import NasaObj from '../NasaObj';
import Info from '../Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import FavoriteButton from '../FavoriteButton';
import { useAuthValue } from '../AuthContext';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../Styles/dayPicker.css';


const Single = () => {

  const [apod, setApod] = useState(null);
  const [err, setErr] = useState(null);
  const [todaysDate, setTodaysDate] = useState('');
  const [userDate, setUserDate] = useState(null);
  const [loading, setLoading] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  // const [copyText, setCopyText] = useState('');
  // const [copied, setCoped] = useState(false);

  // date picker stuff
  const [selected, setSelected] = useState(new Date());
  const [month, setMonth] = useState(new Date()); // reminder: month set by whole date, not just getMonth()
  const earliest_date = new Date(1995, 5, 16);

  // auth stuff
  const { isLoggedIn } = useAuthValue();

  useEffect(() => {
    if (!selected) return;
    // modify date so it can be sent to apod server
    const date = useGetDate(selected);
    setUserDate(date);
  }, [selected]);

  useEffect(() => {
    const singleDay = localStorage.getItem('singleDay');
    setErr(null);

    if (singleDay) {
      // setting the max date
      let date = new Date();
      const today = useGetDate(date);
      setTodaysDate(today);
      // retrieving the previously set single day
      const obj = JSON.parse(singleDay);
      setUserDate(obj.date);
      setApod(obj);
      let new_date = new Date(obj.date + 'T23:00:00.000');
      console.log('selected: ', new_date);
      setSelected(new_date);
      setMonth(new_date);
    } else {
      let date = new Date();
      const today = useGetDate(date);
      setTodaysDate(today);
      setUserDate(today);
      setSelected(new Date());
      setMonth(new Date());
    }

  }, []);

  const handleDate = (e) => {
    e.preventDefault();
    setLoading('Loading...');
    getPhoto(userDate);
    setUserDate(userDate);
  }

  const increaseDay = () => {
    // adding T with generic time for support in iPhones -- due to ISO8601 format supported by IOS
    // see here: https://stackoverflow.com/questions/21883699/safari-javascript-date-nan-issue-yyyy-mm-dd-hhmmss
    let data = userDate + 'T23:00:00.000';

    let newCurrentDate = new Date(data);
    // adding a day's worth of milliseconds to add to the current date
    let endDate = new Date(newCurrentDate.getTime() + (60 * 60 * 24 * 1000))
    // hyphenating so date format can be sent to NASA's database
    endDate = endDate.getFullYear() + "-" + returnMonth(endDate) + "-" + returnDate(endDate);
    setUserDate(endDate);
    getPhoto(endDate);

    // updating calendar
    const new_date = new Date(selected);
    new_date.setDate(new_date.getDate() + 1);
    setSelected(new_date);
    setMonth(new_date);
    

    // updating photo transition
    setChanging();    
  }

  const decreaseDay = () => {
    let data = userDate + 'T23:00:00.000';

    let newCurrentDate = new Date(data);
    // subtracting a day's worth of milliseconds to add to the current date
    let endDate = new Date(newCurrentDate.getTime() - (60 * 60 * 24 * 1000))
    // hyphenating so date format can be sent to NASA's database
    endDate = endDate.getFullYear() + "-" + returnMonth(endDate) + "-" + returnDate(endDate);
    setUserDate(endDate);
    getPhoto(endDate);

    // updating calendar
    const new_date = new Date(selected);
    new_date.setDate(new_date.getDate() - 1);
    setSelected(new_date);
    setMonth(new_date);

    // updating photo transition
    setChanging();    
  }

  const getPhoto = (date) => {
    setLoading('Loading...');
    fetch(`${BASE_API_URL}/api/single-img?date=${date}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log('apod: ', data)
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

  const setChanging = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIsChanging(false);
    }, 1700);
  }

  // date picker footer
  let footer = (
    <>
      <p className='earliest-date'>Earliest date: 06-16-1995</p>
    </>
  );

  return (
    <div className='single-div'>
      <div className="upper-wrap">
        <div className="inner-upper-wrap">
          <header className='single-header'>
            <h1>Single APOD</h1>
            <p>Select a single date or scroll with the buttons</p>
          </header>
          <div className="single-form-wrap">
            <DayPicker
              mode='single'
              selected={selected}
              onSelect={setSelected}
              month={month}
              onMonthChange={setMonth}
              footer={footer}
              fromDate={earliest_date}
              toDate={new Date()}
              captionLayout='dropdown'
              fixedWeeks
            />
          </div>
          <button className="update-btn" onClick={handleDate}>Update picture</button>
        </div>        
      </div>
      <div className="ui-text">{err 
        ? <div className="error-text">{err}</div> 
        : <div className="loading-text">{loading}</div>
      }
      </div>
      
      
      <div className="single-container">
        <h2>{apod ? apod.title : 'Choose an image'}</h2>
        <div className="__inner-wrap">
          <div className="inner-single-header">
            <p>{apod && apod.date}</p>
            { isLoggedIn && <FavoriteButton apod={apod} /> }
          </div>
          {apod && <NasaObj apod={apod} changing={isChanging} />}
        </div>
        {/* navigation buttons */}
        {
          apod &&
            <div className="single-nav">
                {/* hides button if on the earliest date */}
                {apod.date !== '1995-06-16' && 
                  <button className="change-day-btn previous-day" aria-label='go back a day' onClick={decreaseDay}>
                    <FontAwesomeIcon icon={faChevronLeft} className="single-nav-icon-left" />
                    Previous
                  </button>        
                }
                {/* <CopyToClipboard 
                  text={apod?.url}
                  onCopy={() => setCoped(true)}>
                  <span>Copy to clipboard here!</span>
                </CopyToClipboard> */}
                {/* hides button if on today's date */}
                {apod.date !== todaysDate &&
                  <button className="change-day-btn next-day" aria-label='go forward a day' onClick={increaseDay}>
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className="single-nav-icon-right" />
                  </button>        
                }
              </div>
        }

        {apod && <Info apod={apod} />}

      </div>
      
    </div>
  )
}

export default Single