export default function useGetDate(date)  {

  function returnDate(date) {
    let today = date.getDate();

    if (today < 10) {
      today = `0${today}`;
    }

    return today;
  }

  function returnMonth(date) {
    let month = date.getMonth() + 1;

    if (month < 10) {
      month = `0${month}`;
    }

    return month;
  }

  let currentDate = date.getFullYear() + "-" + returnMonth(date) + "-" + returnDate(date);

  return currentDate;
}