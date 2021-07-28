import { padLeft } from "./string";

const padLeftDate = (value: string) => padLeft(value, 2, "0");

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = padLeftDate(String(date.getMonth() + 1));
  const day = padLeftDate(String(date.getDate()));

  const hour = padLeftDate(String(date.getHours()));
  const minute = padLeftDate(String(date.getMinutes()));

  const dateString = [year, month, day].join("-");
  const timeString = [hour, minute].join(":");

  return `${dateString} ${timeString}`;
};

export const addHours = (date: Date, hour: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hour);

  return result;
};
