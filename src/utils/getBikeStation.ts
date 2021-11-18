import axios from 'axios';

const STATION_URL =
  'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(25.032761%2C%20121.5624321%2C%201000)&$format=JSON';

const INFO_URL =
  'https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(25.032761%2C%20121.5624321%2C%201000)&$format=JSON';

type TBikeData = {
  name: string;
  lat: number;
  lng: number;
};

type TRemote = {
  StationName: string;
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
  };
};

const getUrl = (curLat: number, curLng: number) => {
  return {
    STATION_URL: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${curLat}%2C%20${curLng}%2C%201000)&$format=JSON`,
    INFO_URL: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${curLat}%2C%20${curLng}%2C%201000)&$format=JSON`,
  };
};

export const getBikeStation = (
  curLat: number,
  curLng: number,
): Promise<TBikeData[]> => {
  return axios.get(getUrl(curLat, curLng).STATION_URL).then((res) => {
    return res.data.map((ele: TRemote) => ({
      name: ele.StationName,
      lat: ele.StationPosition.PositionLat,
      lng: ele.StationPosition.PositionLon,
    }));
  });
};
