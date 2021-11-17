import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  styled,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faParking,
  faBicycle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const InfoState = styled('span')(({ theme }) => ({
  color: theme.palette.warning.dark,
  borderRadius: 8,
  border: `1px solid ${theme.palette.warning.dark}`,
  padding: '0.3rem 0.8rem',
}));

const InfoDistance = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));

type TStyle = {
  color: 'primary' | 'error';
};

const Quantity = styled('div')<TStyle>(({ theme, color }) => ({
  flexGrow: 1,
  display: 'inline-flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem 0',
  borderRadius: '8px',
  backgroundColor: theme.palette[color].light,
}));

const Label = styled('div')<TStyle>(({ theme, color }) => ({
  color: theme.palette[color].dark,
}));

const BikeListCard = () => {
  return (
    <Card
      component="li"
      sx={{
        boxShadow: 'none',
        mb: 2,
      }}
    >
      <CardActionArea sx={{ color: 'primary.main' }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            我是站名
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Quantity color="primary">
              <Label color="primary">
                <FontAwesomeIcon icon={faBicycle} />
                <Typography variant="button">可租借</Typography>
              </Label>
              <Typography variant="h4" color="primary.dark">
                43
              </Typography>
            </Quantity>
            <Quantity color="error">
              <Label color="error">
                <FontAwesomeIcon icon={faParking} />
                <Typography variant="button">可停車</Typography>
              </Label>
              <Typography variant="h4" color="error.dark">
                25
              </Typography>
            </Quantity>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              pb: 2,
              borderBottomStyle: 'solid',
              borderBottomWidth: '1px',
              borderColor: 'secondary.main',
            }}
          >
            <InfoState>
              <Typography variant="button">可借可還</Typography>
            </InfoState>
            <InfoDistance>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <Typography variant="button" sx={{ ml: 1 }}>
                距離25公尺
              </Typography>
            </InfoDistance>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BikeListCard;
