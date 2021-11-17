import { Button, Stack, styled } from '@mui/material';
import logoLight from '../assets/logo/logo-light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBicycle,
  faRoute,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

const HeaderBar = styled('header')`
  height: 76px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Logo = styled('div')`
  flex: 1;
  padding-left: 4.5rem;

  > img {
    height: 100%;
    object-fit: contain;
  }
`;

const Navbar = styled('nav')`
  flex: 1;
  padding-right: 4.5rem;
`;

const Header = () => {
  return (
    <HeaderBar>
      <Logo>
        <img src={logoLight} alt="logo" />
      </Logo>
      <Navbar>
        <Stack direction="row" justifyContent="end" spacing={3}>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faBicycle} />}
          >
            找單車
          </Button>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faRoute} />}
          >
            找路線
          </Button>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faUmbrellaBeach} />}
          >
            找景點
          </Button>
        </Stack>
      </Navbar>
    </HeaderBar>
  );
};

export default Header;
