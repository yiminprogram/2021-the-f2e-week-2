import { styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './views/Sidebar';
import ErrorPage from './views/ErrorPage';
import Station from './views/Station';
import Bike from './views/Bike';
import Attraction from './views/Attractions';
import Map from './components/Map';

const Page = styled('section')`
  position: relative;
  width: 100vw;
  height: calc(100vh - 76px);
  overflow: hidden;
`;

const App = () => {
  return (
    <>
      <Header />
      <Page>
        <Routes>
          <Route path="map" element={<SideBar />}>
            <Route index element={<Station />} />
            <Route path="station" element={<Station />} />
            <Route path="bike" element={<Bike />} />
            <Route path="attraction" element={<Attraction />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Map />
      </Page>
    </>
  );
};

export default App;
