import { useState } from 'react';
import { styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import Station from './views/Station';
import Bike from './views/Bike';
import Attraction from './views/Attractions';

const Page = styled('section')`
  position: relative;
  width: 100vw;
  height: calc(100vh - 76px);
  overflow: hidden;
`;

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

type TData = {
  station: TBikeData[] | null;
};

const App = () => {
  const [data, setData] = useState<TData>({ station: null });
  const handleData = (type: 'station' | 'bike', data: TBikeData[]) => {
    switch (type) {
      case 'station':
        setData({ ...data, station: data });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Header />
      <Page>
        <Routes>
          <Route path="map" element={<Home handleData={handleData} />}>
            <Route index element={<Station data={data.station} />} />
            <Route path="station" element={<Station data={data.station} />} />
            <Route path="bike" element={<Bike />} />
            <Route path="attraction" element={<Attraction />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Page>
    </>
  );
};

export default App;
