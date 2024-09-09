export default dateObjToStr = (dateObj) => {
  const dates = [
    String(dateObj.date),
    String(dateObj.month),
    String(dateObj.year),
  ];
  return dates.join("-");
};
