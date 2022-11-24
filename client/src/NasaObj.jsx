import { useEffect, useState } from "react";
import Modal from './Modal.jsx';
import Rocket from './Images/1476.gif';

const NasaObj = ({ apod, changing, loading }) => {

  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [clickText, setClickText] = useState('Click me!');

  useEffect(() => {   

    if (loading) {
      const timeoutId = setTimeout(() => {
        setShowButton(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    };    

  }, [loading]);

  useEffect(() => {

    if (clicks > 10) {
      setClickText('Wow! You\'re good!');
    }

    if (clicks > 30) {
      setClickText('Ok, I get it');
    }

    if (clicks > 50) {
      setClickText('All right that\'s enough...');
    }

    if (clicks > 70) {
      setClickText('Yo, stop');
    }

    if (clicks > 90) {
      setClickText('Please load soon!!!');
    }

    if (clicks > 140) {
      setClickText('Clearly you\'re cheating');
    }

  }, [clicks]);



  const openModal = () => {
    if (open) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    } else {
      setOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  const addClicks = () => {
    let new_click = clicks;
    new_click++;
    setClicks(new_click);
  }

  return (
    <div className="apod-obj">

      {
        loading 

        ?  <div className="loading-div">loading... <br /><br />We use a free server to host! Your first image might take a bit more time :) <img src={Rocket} alt="Loading rocket" />
          {showButton
            ? <>
                <p>In the meantime... how many times can you click this button?</p><button className="waiting-btn" aria-label='Number of button clicks' onClick={addClicks}>{clickText} {clicks}</button>
              </>
            : undefined
          }
            </div>
        : apod?.media_type === 'image' 
          ? <img className={`apod-img absolute ${changing ? 'changing' : ''}`} src={apod?.url} alt={apod?.title} onClick={() => openModal()}/>
          : <iframe title="nasa's astronomy picture of the day video" className={`apod-video absolute ${changing ? 'changing' : ''}`} src={apod?.url} />
      }

      <Modal apod={apod ? apod : undefined} open={open} setOpen={setOpen} />
    </div>
  )
}

export default NasaObj
