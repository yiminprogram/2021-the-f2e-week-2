import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  CircularProgress,
} from '@mui/material';

const Notification = () => {
  <Dialog open={false}>
    <DialogTitle>定位中</DialogTitle>
    <DialogContent>
      <DialogContentText>
        使用者位置定位中，請確保裝置以及瀏覽器定位功能和權限為開啟狀態，確保在使用地圖服務時能更加精確的定位使用者位置
      </DialogContentText>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <CircularProgress color="primary" />
      </Box>
    </DialogContent>
  </Dialog>;
};
export default Notification;
