export const TODAY = new Date();
export const TOD_DOW = TODAY.getDay(); // 0=Sun, 1=Mon...

export function getMon() {
  const d = new Date(TODAY);
  d.setHours(0, 0, 0, 0);
  const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
  d.setDate(d.getDate() + diff);
  return d;
}

export function getMondayISO() {
  return getMon().toISOString().slice(0, 10);
}

export function getTimeSlot() {
  const h = new Date().getHours();
  if (h < 9)  return { slot: 'morning',        greeting: 'Good morning' };
  if (h < 12) return { slot: 'mid-morning',    greeting: 'Good morning' };
  if (h < 15) return { slot: 'afternoon',      greeting: 'Good afternoon' };
  if (h < 18) return { slot: 'late-afternoon', greeting: 'Good afternoon' };
  if (h < 21) return { slot: 'evening',        greeting: 'Good evening' };
  return           { slot: 'night',            greeting: 'Evening' };
}

export function advanceRotationIfNewWeek(mealPlanRotation, updateFn) {
  const currentMonday = getMondayISO();
  if (mealPlanRotation.weekStartDate !== currentMonday) {
    const order = ['A', 'B', 'C'];
    const next = order[(order.indexOf(mealPlanRotation.currentWeek) + 1) % 3];
    updateFn({ currentWeek: next, weekStartDate: currentMonday });
  }
}

export function getLastLog(workoutLogs, dateKey, exerciseName) {
  const key = Object.keys(workoutLogs)
    .filter(k => k.endsWith(`|${exerciseName}`) && k.split('|')[0] < dateKey)
    .sort()
    .at(-1);
  return key ? workoutLogs[key] : null;
}

export function suggestWeight(lastSets) {
  if (!lastSets?.length) return null;
  const avg = lastSets.reduce((a, s) => a + s.reps, 0) / lastSets.length;
  return avg >= 11 ? lastSets[0].weight + 2.5 : lastSets[0].weight;
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
