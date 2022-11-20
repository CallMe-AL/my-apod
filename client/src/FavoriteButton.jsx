import React, { useEffect, useState } from 'react';
import { useAuthValue } from './AuthContext';
import { db } from './fb-stuff/firebase';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

// TODO --- see if image already favorited by user

const FavoriteButton = ({ apod }) => {

  const [favApod, setFavApod] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [favId, setFavId] = useState(null);
  const [heartBeat, setHeartBeat] = useState(false);

  const { currentUser, favoriteApods, setFavoriteApods } = useAuthValue();
  const favoritesRef = collection(db, 'fav_apods');

  useEffect(() => {
    if (!apod) return;
    setFavApod(apod);

    const containsDate = favoriteApods.some(obj => obj.data.date === apod.date);
      
    if (!containsDate) {
      setFavorited(false);
    } else {
      setFavorited(true);      
    }

  }, [apod]);

  const addFavorite = () => {
    if (favorited) {
      setFavorited(false);

      // create new temp array for changing favorite array state
      let temp_array = favoriteApods;

      // find index of object to be deleted, then extract id
      const index = temp_array.map(e => e.data.date).indexOf(favApod.date);
      let obj = temp_array.splice(index, 1);
      let obj_id = obj[0].docId;

      // create a doc reference to where that object is
      const docRef = doc(db, 'fav_apods', obj_id);

      // delete from collection. Asyncronous -- can attach .then() if needed
      deleteDoc(docRef);

      // set new favorites array
      // have to iterate because it creates a new reference to a different array, allowing ui to update when favorites are removed in profile
      setFavoriteApods([...temp_array]);

    } else {
      setFavorited(true);   
      
      // adds heartbeat animation after favoriting, removes after animation ends
      // prevents constant animation on page refreshes
      setHeartBeat(true);
      setTimeout(() => {
        setHeartBeat(false);        
      }, 700);

      addDoc(favoritesRef, {
        userId: currentUser.uid,
        copyright: favApod.copyright ? favApod.copyright : null,
        date: favApod.date,
        explanation: favApod.explanation,
        hdurl: favApod.hdurl ? favApod.hdurl : null,
        mediaType: favApod.media_type,
        serviceVersion: favApod.service_version,
        title: favApod.title,
        url: favApod.url
      })
      .then(docRef => {
        setFavId(docRef.id);
      })
      .catch(err => alert(err.message));
    }
  }

  // runs after adding a favorite to get a clean reference to the doc id
  useEffect(() => {

    if (!favId) return;
    const containsId = favoriteApods.some(apod => apod.docId === favId);
    if (containsId) return;

    let newTemp = favoriteApods;
    newTemp.push({ docId: favId, data: favApod });

    setFavoriteApods(newTemp);

  }, [favId]);

  return (
    <>
      <button className={`favorite-btn${favorited ? ' favorited' : ''} ${heartBeat ? 'heartbeat' : ''}`} onClick={addFavorite}>
        <svg className="heart" viewBox="0 0 32 29.6">
          <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
        </svg>
      </button>
    </>
  )
}

export default FavoriteButton