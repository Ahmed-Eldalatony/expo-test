import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
const coordinates = new Coordinates(35.7897507, -78.6912485);
const params = CalculationMethod.MoonsightingCommittee();
const date = new Date(2022, 3, 20);
export const prayerTimes=()=>{
 return new PrayerTimes(coordinates, date, params);
}
