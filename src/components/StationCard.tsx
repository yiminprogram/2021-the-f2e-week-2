import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Stack,
  ListItem,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBicycle,
  faParking,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { getQueryString } from '../utils/getQueryString';

type TProps = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rentBike: number;
  returnBike: number;
  time: string;
  status: number;
};

const StationCard = ({
  name,
  lat,
  lng,
  rentBike,
  returnBike,
  time,
  status,
}: TProps) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation(
      { search: getQueryString({ lat, lng }) },
      { state: { search: true } },
    );
  };
  return (
    <>
      <ListItem>
        <Card sx={{ width: '100%', boxShadow: 'none' }} onClick={handleClick}>
          <CardActionArea sx={{ color: 'primary.main' }}>
            <CardContent sx={{ py: 1 }}>
              <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                {name}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    backgroundColor: 'primary.light',
                    textAlign: 'center',
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" color="primary.dark">
                    <FontAwesomeIcon icon={faBicycle} fixedWidth />
                    可租借
                  </Typography>
                  <Typography variant="body1" color="primary.dark">
                    {rentBike}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    backgroundColor: 'error.light',
                    textAlign: 'center',
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" color="error.dark">
                    <FontAwesomeIcon icon={faParking} fixedWidth />
                    可還車
                  </Typography>
                  <Typography variant="body1" color="error.dark">
                    {returnBike}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  color="warning.main"
                  sx={{
                    borderColor: 'warning.main',
                    border: 1,
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  可借可還
                </Typography>
                <Typography variant="body1" color="primary.main">
                  <FontAwesomeIcon icon={faCheckCircle} fixedWidth />
                  {status === 1 ? '正常營運' : '暫停營運'}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};

export default StationCard;
