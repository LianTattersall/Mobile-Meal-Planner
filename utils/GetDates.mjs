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
    datesArr.push({ dates: getWeek(dateObj), month });
  }
  return datesArr;
}

function getWeek(sunDateObj) {
  const datesOfWeek = [sunDateObj.getDate()];
  for (let i = 0; i < 6; i++) {
    sunDateObj.setDate(sunDateObj.getDate() + 1);
    datesOfWeek.push(sunDateObj.getDate());
  }
  return datesOfWeek;
}
