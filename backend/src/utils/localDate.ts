/* eslint-disable prettier/prettier */
export const localDate = () => {
  const date: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Europe/Paris',
  };

  const dateNow: string = date.toLocaleString('fr-Fr', options);

  return dateNow;
};
