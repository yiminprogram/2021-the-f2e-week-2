import { useState, MouseEvent } from 'react';
import { Stack, Button, styled, Menu, MenuItem, Fab, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSortAmountDown,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import BikeListCard from './BikeListCard';

type TStyle = {
  hide: boolean;
};

const List = styled('div', {
  shouldForwardProp: (props) => props !== 'hide',
})<TStyle>(({ theme, hide }) => ({
  position: 'absolute',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '4px 4px 20px rgba(118,118,118,0.3)',
  paddingTop: '1rem',
  transition: '500ms ease-in-out',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  height: hide ? '97.5167px' : 'calc(100% - 2rem)',
  top: '1rem',
  left: '1rem',

  [theme.breakpoints.up('xs')]: {
    width: 'calc(100% - 2rem)',
  },

  [theme.breakpoints.up('md')]: {
    width: '600px',
  },
}));

const DataList = styled('ul', {
  shouldForwardProp: (props) => props !== 'hide',
})<TStyle>(({ hide }) => ({
  width: '100%',
  height: hide ? 0 : '100%',
  overflow: 'auto',
  padding: '0 1rem',
  transition: '500ms ease-in-out',
}));

const Searchbar = styled('div')`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled('div')`
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 0;
  font-size: 1.3rem;
  color: #767676;
  display: inline-flex;
  align-items: center;
`;

const SearchInput = styled('input')(({ theme }) => ({
  color: theme.palette.primary.dark,
  width: '100%',
  backgroundColor: '#eeeeee',
  borderRadius: '8px',
  padding: '0.6rem 1rem',
  border: 'none',
  fontSize: '1rem',
  paddingRight: '3rem',

  '&:focus': {
    outline: '2px solid #a4b375',
  },
}));

const BottomButton = styled('div', {
  shouldForwardProp: (props) => props !== 'hide',
})<TStyle>(({ hide }) => ({
  transform: hide ? 'none' : 'rotate(180deg)',
  transition: '500ms ease-in-out',
}));

const Bikelist = () => {
  const [hide, setHide] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHide = () => {
    setHide(!hide);
  };
  return (
    <List hide={hide}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ px: '1rem', width: '100%', mb: 1 }}
      >
        <Searchbar>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <SearchInput placeholder="搜尋站點或鄰近站點" />
        </Searchbar>
        <Button
          id="sort-menu-button"
          onClick={handleOpen}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faSortAmountDown} />}
        >
          排序
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>距離較近</MenuItem>
          <MenuItem onClick={handleClose}>可借車數</MenuItem>
          <MenuItem onClick={handleClose}>可還車數</MenuItem>
        </Menu>
      </Stack>
      <DataList hide={hide}>
        {[1, 2, 3, 4, 5, 6].map((ele) => (
          <BikeListCard key={ele} />
        ))}
      </DataList>
      <Button variant="text" onClick={handleHide}>
        <BottomButton hide={hide}>
          <FontAwesomeIcon icon={faArrowDown} />
        </BottomButton>
      </Button>
    </List>
  );
};

export default Bikelist;
