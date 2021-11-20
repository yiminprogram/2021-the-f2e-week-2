import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorNestRoute = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        fontSize: '2rem',
        color: 'error.main',
        pt: 3,
      }}
    >
      <FontAwesomeIcon icon={faTimesCircle} />
      <Typography variant="h3" color="error.main" sx={{ mt: 3 }}>
        頁面錯誤，請輸入正確網址
      </Typography>
    </Box>
  );
};

export default ErrorNestRoute;
