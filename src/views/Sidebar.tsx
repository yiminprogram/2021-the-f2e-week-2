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
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCrosshairs,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getQueryString } from '../utils';
import NavTab from '../components/NavTab';

type TProps = {
  icon: IconProp;
  title: string;
  onClick?: () => void;
};

const SidebarIcon = ({ icon, title, onClick }: TProps) => {
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

const Sidebar = () => {
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
    navigation(
      {
        search: getQueryString({
          lat: 25.02487262639445,
          lng: 121.5689479334554,
        }),
      },
      {
        state: {
          search: true,
        },
      },
    );
  };

  return (
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
        <InputBase
          placeholder="地址搜尋"
          sx={{ color: 'primary.main', flex: 1, px: 2 }}
          value={query}
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
          right: { xs: hide ? '-50px' : '-40px', md: hide ? '-60px' : '-50px' },
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
  );
};

export default Sidebar;
