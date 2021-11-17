import { styled } from '@mui/material';
import Header from './components/Header';
import Map from './components/Map';
import BikeList from './components/BikeList';
import { Grid } from '@mui/material';

const Page = styled('div')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const MainPage = styled('section')`
  position: relative;
  height: calc(100vh - 76px);
`;

const App = () => {
  return (
    <Page>
      <Header />
      <MainPage>
        <Map />
        <BikeList />
      </MainPage>
    </Page>
  );
};

export default App;
