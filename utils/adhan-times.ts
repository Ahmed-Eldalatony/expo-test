import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';
const coordinates = new Coordinates(30.5646, 30.9866); // Coordinates for El Munofia, Egypt
const params = CalculationMethod.Egyptian();
const date = new Date();
const now = new Date();

export const prayerTimes =()=> {
return new PrayerTimes(coordinates, now, params);
}



export const prayerNames: Prayer[] = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

