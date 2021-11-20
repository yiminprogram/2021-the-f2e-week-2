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

const StationCard = () => {
  return (
    <>
      <ListItem>
        <Card sx={{ width: '100%', boxShadow: 'none' }}>
          <CardActionArea sx={{ color: 'primary.main' }}>
            <CardContent sx={{ py: 1 }}>
              <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                太原廣場
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
                    43
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
                    15
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
                  正常營運
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
