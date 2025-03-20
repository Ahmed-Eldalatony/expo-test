import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';
// import dayjs from 'dayjs';
const coordinates = new Coordinates(30.5646, 30.9866); // Coordinates for El Munofia, Egypt
const params = CalculationMethod.Egyptian();

export const getPrayerTimes = ( date = new Date()) => {
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
};
