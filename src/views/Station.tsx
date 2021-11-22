import StationCard from '../components/StationCard';
import { Typography } from '@mui/material';

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

type TProps = {
  data: TBikeData[] | null;
};

const Station = ({ data }: TProps) => {
  return (
    <>
      {data ? (
        data.map((ele) => <StationCard {...ele} key={ele.id} />)
      ) : (
        <Typography
          variant="h3"
          color="warning"
          sx={{ textAlign: 'center', py: 2 }}
        >
          沒有搜尋結果
        </Typography>
      )}
    </>
  );
};

export default Station;
