import { Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faBicycle,
  faParking,
} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

type TStyle = {
  quantity: number;
};

const Container = styled.div`
  width: 350px;
  border-radius: 8px;
  border: 2px solid #a4b375;
  box-shadow: 0 0 20px rgba(118, 118, 118, 0.3);
  background-color: #fff;
  padding: 1rem 1.3rem;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #738047;
  margin-bottom: 0.5rem;
`;

const Item = styled.div<TStyle>`
  flex-grow: 1;
  background-color: ${({ quantity }) =>
    quantity === 0 ? '#EEEEEE' : quantity > 10 ? '#DFE4CE' : '#F7D4DD'};
  color: ${({ quantity }) =>
    quantity === 0 ? '#767676' : quantity > 10 ? '#474F2C' : '#BC3253'};
  border-radius: 4px;
  padding: 0.5rem 0;
  text-align: center;
`;

const Time = styled.time`
  flex-grow: 1;
  color: #767676;
  text-align: right;
`;

const ItemText = styled.span`
  font-size: 15px;
  font-weight: 500;
  font-family: 'Noto Sans TC';
  padding-left: 0.3rem;
`;

type TBikeData = {
  name: string;
  lat: number;
  lng: number;
  rentBike: number;
  returnBike: number;
  time: string;
};

const PopCard = ({ time, name, rentBike, returnBike }: TBikeData) => {
  return (
    <Container>
      <Title>{name}</Title>
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack direction="row" spacing={1} sx={{ flexGrow: 3 }}>
          <Item quantity={rentBike}>
            <FontAwesomeIcon icon={faBicycle} />
            <ItemText>{rentBike}</ItemText>
          </Item>
          <Item quantity={returnBike}>
            <FontAwesomeIcon icon={faParking} />
            <ItemText>{returnBike}</ItemText>
          </Item>
        </Stack>
        <Time>
          <FontAwesomeIcon icon={faClock} />
          <ItemText>{time}</ItemText>
        </Time>
      </Stack>
    </Container>
  );
};

export default PopCard;
