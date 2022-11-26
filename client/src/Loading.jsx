import React, { useEffect, useState } from 'react';
import Rocket from './Images/1476.gif';


const Loading = () => {

  const [clicks, setClicks] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [clickText, setClickText] = useState('Click me!');

  useEffect(() => {   
    const timeoutId = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timeoutId);  
  }, []);

  useEffect(() => {

    if (clicks > 10) {
      setClickText('Wow! You\'re good!');
    }

    if (clicks > 35) {
      setClickText('Ok, I get it');
    }

    if (clicks > 60) {
      setClickText('All right that\'s enough...');
    }

    if (clicks > 85) {
      setClickText('Yo, stop');
    }

    if (clicks > 110) {
      setClickText('Please load soon!!!');
    }

    if (clicks > 160) {
      setClickText('Clearly you\'re cheating');
    }

  }, [clicks]);

  const addClicks = () => {
    let newClick = clicks;
    newClick++;
    setClicks(newClick);
  }

  return (
    <div className="loading-div">loading... <br /><br />We use a free server to host! Your first image might take a bit more time :) <img src={Rocket} alt="Loading rocket" />
          {showButton
            ? <>
                <p>In the meantime... how many times can you click this button?</p><button className="waiting-btn" aria-label='Number of button clicks' onClick={addClicks}>{clickText} {clicks}</button>
              </>
            : undefined
          }
    </div>
  )
}

export default Loading