import { useEffect, useState } from "react";
import { BASE_API_URL } from '../utils/constants';

export default function useGetSingleAPOD(today) {
  const [image, setImage] = useState(null);

  useEffect(() => {    

    const getPhoto = () => {
      const response = fetch(`${BASE_API_URL}/api/single-img`, {
        method: 'GET'
      })
      // .then(response => response.json())
      .then(data => {
        setImage(data);
        localStorage.setItem('currentDay', JSON.stringify(data));
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

  return image;
}
