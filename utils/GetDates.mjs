export function getDates() {
  const datesArr = [];
  const now = new Date();
  now.setDate(now.getDate() - now.getDay());
  now.setDate(now.getDate() - 7 * 8);
  for (let i = 0; i < 21; i++) {
    now.setDate(now.getDate() + 7);
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const dateObj = new Date(year, month, date);
    datesArr.push(getWeek(dateObj));
  }
  return datesArr;
}

function getWeek(sunDateObj) {
  const datesOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const year = sunDateObj.getFullYear();
    const month = sunDateObj.getMonth();
    const date = sunDateObj.getDate();
    datesOfWeek.push({ date, year, month });
    sunDateObj.setDate(sunDateObj.getDate() + 1);
  }
  return datesOfWeek;
}
