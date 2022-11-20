import React, { useState, useEffect } from 'react';
import RangeImage from '../RangeImage';
import RangeVideo from '../RangeVideo';
import InfoDiv from '../InfoDiv';
import { db } from '../fb-stuff/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from '../AuthContext';

const Favorites = () => {

  const [sortValue, setSortValue] = useState('a-z');
  const [activeItem, setActiveItem] = useState('');
  const [activeApod, setActiveApod] = useState(null);

  const { currentUser, isLoggedIn, favoriteApods, setFavoriteApods } = useAuthValue();

  // runs every time due to nasa security
  // apod.nava.gov will not allow images to be displayed if embedded on another page
  // see here: https://support.mozilla.org/en-US/kb/xframe-neterror-page?as=u&utm_source=inproduct
  useEffect(() => {
    if (!isLoggedIn) return;
    const q = query(collection(db, 'fav_apods'), where("userId", "==", currentUser.uid));
    const temp_favs = [];

    getDocs(q)
      .then((query) => {
        query.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data())
          temp_favs.push({ docId: doc.id, data: doc.data() });
        })
      })
      .then(() => setFavoriteApods(temp_favs));

  }, []);

  const changeSorting = (e) => {
    // *** SORT MUTATES ORIGINAL ARRAY, do i want that???***

    // if (e.target.value === sortValue) return;

    if (e.target.value === 'a-z') {
      favoriteApods.sort((a, b) => (a.data.title > b.data.title) ? 1 : -1);
      setSortValue('a-z');

    }

    if (e.target.value === 'z-a') {    
      favoriteApods.sort((a, b) => (a.data.title < b.data.title) ? 1 : -1);
      setSortValue('z-a');
    }

    if (e.target.value === 'recent') {
      favoriteApods.sort((a, b) => (a.data.date < b.data.date) ? 1 : -1);
      setSortValue('recent');
    }

    if (e.target.value === 'oldest') {
      favoriteApods.sort((a, b) => (a.data.date > b.data.date) ? 1 : -1);
      setSortValue('oldest');
    }

    if (e.target.value === 'image') {
      favoriteApods.sort((a, b) => (a.data.mediaType > b.data.mediaType) ? 1 : -1);
      setSortValue('image');
    }

    if (e.target.value === 'video') {
      favoriteApods.sort((a, b) => (a.data.mediaType < b.data.mediaType) ? 1 : -1);
      setSortValue('video');
    }
  }

  return (
    <div className="favorites-wrap">
        <div className="__head">
          <h2>Favorites</h2>
          <form className='sort-form'>
            <label htmlFor="sort" className='sr-only'>Sort favorites</label>
            <select name="sort" value={sortValue} onChange={changeSorting} placeholder='Sort by...'>
              <option value='Sort by...' disabled>Sort by...</option>
              <option value="a-z">Name a-z</option>
              <option value="z-a">Name z-a</option>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </form>
        </div>
        <div className="main-range-content-div">
          <div className="images-cont">
            {
              favoriteApods.length > 0
              
              ? favoriteApods.map((apod, index) => {
                  if (apod.data.mediaType === 'image') {
                    return <RangeImage key={apod.docId} apod={apod.data} index={index} activeItem={activeItem} setActiveItem={setActiveItem} setActiveApod={setActiveApod} />
                  } else {
                    return <RangeVideo key={apod.docId} apod={apod.data} index={index} activeItem={activeItem} setActiveItem={setActiveItem} setActiveApod={setActiveApod} />
                  }
                  
                })
              
              : 'Go favorite some space stuff!'
            }
          </div>
          {
            favoriteApods.length > 0 && 
              <aside className="info-div">
                <InfoDiv activeApod={activeApod} /> 
              </aside>
          }
        </div>
      </div>
  )
}

export default Favorites