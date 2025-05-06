import { Snackbar, Alert } from '@mui/material';
import { constants } from '../../../constants/constants';

import '../../../assets/shared-variables.css';

interface SaveAlert {
  saveAlert: boolean;
  alertOnClose: () => void;
}

export const SaveAlert = ({ saveAlert, alertOnClose }: SaveAlert) => {
  return (
    <Snackbar
      autoHideDuration={constants.ALERT_AUTO_HIDE_DURATION}
      open={saveAlert}
      onClose={alertOnClose}
      disableWindowBlurListener={true}
    >
      <Alert
        icon={false}
        onClose={alertOnClose}
        sx={{
          backgroundColor: 'var(--success-alert-bg)',
          color: 'var(--alert-color)',
          fontFamily: 'var(--default-font-family)',
        }}
      >
        Successfully saved URLs
      </Alert>
    </Snackbar>
  );
};
