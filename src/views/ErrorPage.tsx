import { Box, styled } from '@mui/material';
import PageNotFound from '../assets/image/404.svg';

const ImageContainer = styled('div')`
  max-width: 700px;
  margin-bottom: 3rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ErrorPage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 76px)',
        bgcolor: 'primary.light',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        overflow: 'hidden',
      }}
    >
      <ImageContainer>
        <img src={PageNotFound} alt="404" />
      </ImageContainer>
    </Box>
  );
};

export default ErrorPage;
