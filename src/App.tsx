import styled from '@emotion/styled';
import Header from './components/Header';
import Map from './components/Map';
import BikeList from './components/BikeList';
import { Grid } from '@mui/material';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Main = styled.div`
  position: relative;
  height: calc(100vh - 76px);
`;

const RouterWrapper = styled.div`
  position: absolute;
  max-width: 500px;
  height: 100%;
  top: 0;
  left: 0;
  padding: 2rem 1.5rem;
`;

const App = () => {
  return (
    <Page>
      <Header />
      <Grid
        container
        sx={{
          position: 'relative',
          bgcolor: '#ccc',
          height: 'calc(100vh - 76px)',
        }}
      >
        <Map />
        <Grid item sx={{ padding: '2rem' }} xs={12} lg={4}>
          <BikeList />
        </Grid>
      </Grid>
    </Page>
  );
};

export default App;
