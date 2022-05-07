import React, { useState, useEffect } from 'react';

const JumpToTopBtn = () => {

  const [showBtn, setShowBtn] = useState(false);

  const jumpToTop = () => {
    console.log('click!');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {

    const scrollDistance = () => {
      if (window.pageYOffset > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    }

    window.addEventListener('scroll', scrollDistance);

    return () => window.removeEventListener("scroll", scrollDistance);

  }, []);

  return (
    <>
      {showBtn && <a className='jump-to-top-btn' onClick={jumpToTop}>
        <i role="link" aria-label="scroll to top of page" className="fas fa-chevron-up"></i>
      </a>}
    </>
    
  )
};

export default JumpToTopBtn;
