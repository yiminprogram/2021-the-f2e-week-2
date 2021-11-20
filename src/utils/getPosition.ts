import axios from 'axios';

const addressUrl = (query: string) => {
  return `https://link.motc.gov.tw/v2/Road/Link/GeoLocating/Address/AddressRDName/${query}?$top=1&$format=JSON`;
};

const positionUrl = (address: string) => {
  return `https://gist.motc.gov.tw/gist_api/V3/Map/GeoCode/Coordinate/Address/${address}?$format=GEOJSON`;
};

const getPosition = () => {};
export default getPosition;
