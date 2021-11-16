import styled from '@emotion/styled';
import Header from './components/Header';
import MapImage from './assets/image/test-map.jpg';

const Map = styled.div`
  height: calc(100vh - 76px);

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const App = () => {
  return (
    <>
      <Header />
      <Map>
        <img src={MapImage} alt="erro" />
      </Map>
    </>
  );
};

export default App;
