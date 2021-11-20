import { styled } from '@mui/material';
import logoLight from '../assets/logo/logo-light.svg';

const HeaderBar = styled('header')`
  height: 76px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Logo = styled('div')`
  > img {
    height: 100%;
    object-fit: contain;
  }
`;

const Header = () => {
  return (
    <HeaderBar>
      <Logo>
        <img src={logoLight} alt="logo" />
      </Logo>
    </HeaderBar>
  );
};

export default Header;
