import { useEffect, useState } from "react";
import { BASE_API_URL } from '../utils/constants';

export default function useGetTodaysAPOD(today) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {    

    const getPhoto = () => {
      const response = fetch(`${BASE_API_URL}/api/single-img`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        // if a status code other than 200 is sent back
        if (data.error) {
          setError(data);
        } else {
          setImage(data);
          localStorage.setItem('currentDay', JSON.stringify(data));
        }
      })
      .catch(error => {
        console.log(error);
      });
    };

    if (localStorage.getItem('currentDay') === null) {
      getPhoto();
    } else {
      const data = localStorage.getItem('currentDay');
      const newData = JSON.parse(data);
      if (newData.date !== today) {
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
