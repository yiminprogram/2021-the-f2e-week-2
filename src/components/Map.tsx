import Image from '../assets/image/test-map.jpg';
import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.8;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Map = () => {
  return (
    <Container>
      <img src={Image} />
    </Container>
  );
};

export default Map;
