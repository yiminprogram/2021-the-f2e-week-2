import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

type TNotification = {
  type: 'error' | 'search';
};

type TDialog = {
  open: boolean;
  handleClose: () => void;
};

type TProps = TNotification & TDialog;

const Error = ({ open, handleClose }: TDialog) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <FontAwesomeIcon icon={faExclamationCircle} fixedWidth />
        錯誤
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          資料擷取錯誤，請重新整理頁面或稍後再進行搜尋
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>確認</Button>
      </DialogActions>
    </Dialog>
  );
};

const SearchPosition = ({ open, handleClose }: TDialog) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>定位中</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Notification = ({ type, handleClose, open }: TProps) => {
  return (
    <>
      {type === 'error' ? (
        <Error open={open} handleClose={handleClose} />
      ) : (
        <SearchPosition open={open} handleClose={handleClose} />
      )}
    </>
  );
};
export default Notification;
