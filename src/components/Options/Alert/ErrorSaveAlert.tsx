import { Snackbar, Alert } from '@mui/material';
import { constants } from '../../../constants/constants';

import '../../../assets/shared-variables.css';

interface ErrorSaveAlert {
  errorSaveAlert: boolean;
  alertOnClose: () => void;
}

export const ErrorSaveAlert = ({ errorSaveAlert, alertOnClose }: ErrorSaveAlert) => {
  return (
    <Snackbar
      autoHideDuration={constants.ALERT_AUTO_HIDE_DURATION}
      open={errorSaveAlert}
      onClose={alertOnClose}
      disableWindowBlurListener={true}
    >
      <Alert
        icon={false}
        onClose={alertOnClose}
        sx={{
          backgroundColor: 'var(--error-alert-bg)',
          color: 'var(--alert-color)',
          fontFamily: 'var(--default-font-family)',
        }}
      >
        Unable to save URLs
      </Alert>
    </Snackbar>
  );
};
