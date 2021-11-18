import { stringify } from 'querystring';

export const getQueryString = (obj: any): string => {
  return stringify(obj);
};
