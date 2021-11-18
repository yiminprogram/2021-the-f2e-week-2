import { HmacSHA1 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

export const getAuthorizationHeader = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY!;

  const GMTString = new Date().toUTCString();

  const HASH = HmacSHA1(`x-date: ${GMTString}`, APP_KEY);

  const HMAC = Base64.stringify(HASH);

  const Authorization = `hmac username="${APP_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return { Authorization, 'X-Date': GMTString };
};
