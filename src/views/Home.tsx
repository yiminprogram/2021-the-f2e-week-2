import { useState, FormEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Paper,
  Stack,
  InputBase,
  IconButton,
  List,
  Tooltip,
  Fab,
  MenuItem,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCrosshairs,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getQueryString, getStation } from '../utils';
import NavTab from '../components/NavTab';
import stationCity from '../assets/data/station-city.json';
import Map from '../components/Map';

type TIconProps = {
  icon: IconProp;
  title: string;
  onClick?: () => void;
};

const SidebarIcon = ({ icon, title, onClick }: TIconProps) => {
  return (
    <Tooltip title={title} placement="right">
      <Fab
        onClick={onClick}
        color="primary"
        sx={{
          fontSize: { xs: '1rem', md: '1.3rem' },
          width: { xs: '40px', md: '50px' },
          height: { xs: '40px', md: '50px' },
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </Fab>
    </Tooltip>
  );
};
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
  handleData: (type: 'station' | 'bike', data: TBikeData[]) => void;
};

const Home = ({ handleData }: TProps) => {
  const [data, setData] = useState<TBikeData[] | null>(null);
  // control select
  const [city, setCity] = useState('Taipei');
  // control sidebar
  const [hide, setHide] = useState(false);
  const handleHide = () => {
    setHide(!hide);
  };

  // control form submit
  const navigation = useNavigate();
  const [query, setQuery] = useState<string>('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigation({
      search: getQueryString({
        lat: 25.02487262639445,
        lng: 121.5689479334554,
      }),
    });
    getStation({ city, query }).then((res) => {
      handleData('station', res);
      setData(res);
    });
  };

  return (
    <>
      <Map data={data} />
      <Stack
        direction="column"
        spacing={2}
        sx={{
          position: 'absolute',
          top: 0,
          left: {
            xs: hide ? 'calc(-100vw + 56px)' : 0,
            md: hide ? '-500px' : 0,
          },
          width: {
            xs: 'calc(100vw - 56px)',
            md: '500px',
          },
          height: '100%',
          p: 2,
          transition: '500ms ease-in-out',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          component="form"
          sx={{ display: 'flex', alignItems: 'center', p: 1 }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="city-selet"
            label="選擇縣市"
            value={city}
            select
            sx={{ flex: 1 }}
            color="primary"
            onChange={(e) => setCity(e.target.value)}
          >
            {stationCity.map((ele) => (
              <MenuItem value={ele.value} key={ele.id}>
                {ele.id}
              </MenuItem>
            ))}
          </TextField>
          <InputBase
            placeholder="地址或站名搜尋"
            sx={{ color: 'primary.main', flex: 2, px: 2 }}
            value={query}
            required
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </Paper>
        <Paper
          sx={{ bgcolor: '#fff', flexGrow: 1, overflow: 'auto' }}
          elevation={3}
        >
          <NavTab />
          <List>
            <Outlet />
          </List>
        </Paper>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            position: 'absolute',
            right: {
              xs: hide ? '-50px' : '-40px',
              md: hide ? '-60px' : '-50px',
            },
            top: 0,
          }}
        >
          <SidebarIcon icon={faSearch} title="搜尋地址" onClick={handleHide} />
          <SidebarIcon
            icon={faExchangeAlt}
            title="收合邊欄"
            onClick={handleHide}
          />
          <SidebarIcon icon={faCrosshairs} title="我的位置" />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
