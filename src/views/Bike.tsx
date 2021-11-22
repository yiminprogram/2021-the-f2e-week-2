import fix from '../assets/image/fix.svg';
import styled from '@emotion/styled';

const Image = styled.div`
  padding: 3rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Bike = () => {
  return (
    <div>
      <Image>
        <img src={fix} alt="fix" />
      </Image>
    </div>
  );
};

export default Bike;
