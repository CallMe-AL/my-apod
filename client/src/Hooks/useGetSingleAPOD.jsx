import { useEffect, useState } from "react";
import { BASE_API_URL } from '../utils/constants';

export default function useGetSingleAPOD(date) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {    

    const getPhoto = () => {
      fetch(`${BASE_API_URL}/api/single-img?date=${date}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        // if a status code other than 200 is sent back
        if (data.error) {
          setError(data);
        } else {
          setImage(data);
          localStorage.setItem('singleDay', JSON.stringify(data));
        }
      })
      .catch(error => {
        console.log(error);
      });
    };

    if (localStorage.getItem('singleDay') === null) {
      getPhoto();
    } else {
      const data = localStorage.getItem('singleDay');
      const newData = JSON.parse(data);
      if (newData.date !== date) {
        getPhoto();
      } else {
        setImage(newData);
      }
      
    }

  }, []);

  if (image) {
    return image;
  } else if (error) {
    return error;
  }
}