export const formatDate = (date : Date) => {
  let dateP = new Date(date) 
  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(dateP.getDate());
  const month = pad(dateP.getMonth() + 1); // getMonth() devuelve 0-11
  const year = dateP.getFullYear();
  const hour = pad(dateP.getHours());
  const minute = pad(dateP.getMinutes());

  return `${day}/${month}/${year} ${hour}:${minute}`;
}
