import { useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import {
  Stack,
  Button,
  styled as muiStyled,
  Menu,
  MenuItem,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import BikeListCard from './BikeListCard';

const List = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
  padding: 1rem;
  position: relative;
`;

const DataList = styled.ul`
  position: absolute;
  width: calc(100% - 2rem);
  height: 85%;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
`;

const Searchbar = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 0;
  font-size: 1.3rem;
  color: #767676;
  display: inline-flex;
  align-items: center;
`;

const SearchInput = muiStyled('input')(({ theme }) => ({
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

const Bikelist = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <List>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
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
      <DataList>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <BikeListCard />
        ))}
      </DataList>
    </List>
  );
};

export default Bikelist;
