export const TODAY = new Date();
export const TOD_DOW = TODAY.getDay(); // 0=Sun, 1=Mon...

export function getMon() {
  const d = new Date(TODAY);
  d.setHours(0, 0, 0, 0);
  const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
  d.setDate(d.getDate() + diff);
  return d;
}

// offset 0=Mon, 1=Tue, ..., 6=Sun
export function dayKeyOf(offsetFromMon) {
  const d = getMon();
  d.setDate(d.getDate() + offsetFromMon);
  return d.toISOString().slice(0, 10);
}

// converts Mon-Sun offset (0-6) to JS day-of-week (0=Sun, 1=Mon...)
export function dowOfOffset(i) {
  return [1, 2, 3, 4, 5, 6, 0][i];
}

// converts JS day-of-week to Mon-Sun offset
export function offsetOfDow(dow) {
  return [1, 2, 3, 4, 5, 6, 0].indexOf(dow);
}

export function calcStreak(done) {
  let s = 0;
  for (let i = 0; i < 7; i++) {
    if (done[dayKeyOf(i)]) s++;
    else break;
  }
  return s;
}

export function isThisWeek(key) {
  for (let i = 0; i < 7; i++) if (dayKeyOf(i) === key) return true;
  return false;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function formatHeaderDate() {
  return `${DAYS[TOD_DOW]}, ${TODAY.getDate()} ${MONTHS[TODAY.getMonth()]}`;
}
