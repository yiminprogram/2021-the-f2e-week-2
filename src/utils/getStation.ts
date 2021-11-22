import axios from 'axios';
import { getAuthorizationHeader } from '.';

type TBikeData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rentBike: number;
  returnBike: number;
  time: string;
  status: number;
};

type TName = {
  Zh_tw: string;
  En: string;
};

type TRemoteStation = {
  StationID: string;
  StationName: TName;
  UpdateTime: string;
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
  };
  StationAddress: TName;
};

type TRmoteStateInfo = {
  StationID: string;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  ServiceStatus: number;
};

const getUrl = (city: string) => {
  return {
    STATION_URL: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$format=JSON`,
    INFO_URL: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?$format=JSON`,
  };
};

type TQuery = {
  city: string;
  query: string;
};

export const getStation = ({ city, query }: TQuery): Promise<TBikeData[]> => {
  return axios
    .all([
      axios.get(getUrl(city).STATION_URL, {
        headers: getAuthorizationHeader(),
      }),
      axios.get(getUrl(city).INFO_URL, {
        headers: getAuthorizationHeader(),
      }),
    ])
    .then(
      axios.spread((station, info) => {
        const data: TBikeData[] = [];
        station.data.forEach((ele: TRemoteStation) => {
          if (
            ele.StationName.Zh_tw.includes(query) ||
            ele.StationAddress.Zh_tw.includes(query)
          ) {
            data.push({
              id: ele.StationID,
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
              status: info.data.find(
                (ele2: TRmoteStateInfo) => ele2.StationID === ele.StationID,
              ).ServiceStatus,
            });
          }
        });
        return data;
      }),
    );
};
