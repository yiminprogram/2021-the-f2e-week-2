import { styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Test from './views/Test';

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
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Page>
    </Container>
  );
};

export default App;
