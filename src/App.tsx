import { styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserPosition from './views/UserPosition';
import Home from './views/Home';

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Page = styled('section')`
  position: relative;
  height: calc(100vh - 76px);
`;

const App = () => {
  return (
    <Container>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<UserPosition />} />
          <Route path="map" element={<Home />} />
        </Routes>
      </Page>
    </Container>
  );
};

export default App;
