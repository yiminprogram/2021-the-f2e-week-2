import axios from 'axios';
import { getAuthorizationHeader } from '../utils';

const STATION_URL =
  'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(25.032761%2C%20121.5624321%2C%201000)&$format=JSON';

const INFO_URL =
  'https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(25.032761%2C%20121.5624321%2C%201000)&$format=JSON';

type TBikeData = {
  name: string;
  lat: number;
  lng: number;
  rentBike: number;
  returnBike: number;
  time: string;
};

type TRemoteStation = {
  StationID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  UpdateTime: string;
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
  };
};

type TRmoteStateInfo = {
  StationID: string;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
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
  return axios
    .all([
      axios.get(getUrl(curLat, curLng).STATION_URL, {
        headers: getAuthorizationHeader(),
      }),
      axios.get(getUrl(curLat, curLng).INFO_URL, {
        headers: getAuthorizationHeader(),
      }),
    ])
    .then(
      axios.spread((station, info) => {
        console.log(station);
        console.log(info);
        return station.data.map((ele: TRemoteStation) => ({
          name: ele.StationName.Zh_tw,
          lat: ele.StationPosition.PositionLat,
          lng: ele.StationPosition.PositionLon,
          rentBike: info.data.find(
            (ele2: TRmoteStateInfo) => ele2.StationID === ele.StationID,
          ).AvailableRentBikes,
          returnBike: info.data.find(
            (ele2: TRmoteStateInfo) => ele2.StationID === ele.StationID,
          ).AvailableReturnBikes,
          time: new Date(ele.UpdateTime).toLocaleTimeString(),
        }));
      }),
    );
};
