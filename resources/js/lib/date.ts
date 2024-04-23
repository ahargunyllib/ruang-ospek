import type { CustomDate } from "@/types";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function dateToString(rawDate: Date): CustomDate {
  const dayNumber = new Date(rawDate).getDay();
  const monthNumber = new Date(rawDate).getMonth();

  const day = days[dayNumber];
  const date = new Date(rawDate).getDate();
  const month = months[monthNumber];
  const year = new Date(rawDate).getFullYear();
  const hours =
    new Date(rawDate).getHours() < 10
      ? `0${new Date(rawDate).getHours()}`
      : new Date(rawDate).getHours();
  const minutes =
    new Date(rawDate).getMinutes() < 10
      ? `0${new Date(rawDate).getMinutes()}`
      : new Date(rawDate).getMinutes();

  return {
    day,
    date,
    month,
    year,
    hours,
    minutes,
  } as CustomDate;
}
