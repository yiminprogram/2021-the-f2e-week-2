import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPosition, getQueryString } from '../utils';

const UserPosition = () => {
  const navigation = useNavigate();
  useEffect(() => {
    getPosition().then((res) => {
      setTimeout(() => {
        navigation({
          pathname: 'map',
          search: getQueryString({
            lat: res.coords.latitude,
            lng: res.coords.longitude,
            zoom: 17,
          }),
        });
      }, 1000);
    });
  }, [navigation]);
  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'primary.light',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      }}
    >
      <CircularProgress color="primary" sx={{ mb: 3 }} />
      <Typography variant="h2">定位中······</Typography>
    </Box>
  );
};

export default UserPosition;
