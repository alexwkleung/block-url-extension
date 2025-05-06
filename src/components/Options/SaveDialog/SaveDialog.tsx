import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

import '../../../assets/shared-variables.css';

interface SaveDialog {
  saveDialogOpen: boolean;
  saveButtonClose: () => void;
  saveLoading: boolean;
  saveButtonContinue: () => Promise<void>;
}

export const SaveDialog = ({
  saveDialogOpen,
  saveButtonClose,
  saveLoading,
  saveButtonContinue,
}: SaveDialog) => {
  return (
    <Dialog
      open={saveDialogOpen}
      onClose={saveButtonClose}
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'var(--default-bg)',
          },
        },
      }}
    >
      <DialogTitle sx={{ color: 'var(--default-color)', fontFamily: 'var(--default-font-family)' }}>
        Save All URLs?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: 'var(--default-color)', fontFamily: 'var(--default-font-family)' }}
        >
          Are you sure you want to save all URLs?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={saveButtonClose}
          disabled={saveLoading}
          sx={{
            '&:hover': {
              backgroundColor: 'var(--button-bg)',
              borderRadius: 'var(--button-border-radius)',
            },
            '&.Mui-disabled': {
              color: 'grey',
            },
            color: 'var(--default-color)',
            fontFamily: 'var(--default-font-family)',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={saveButtonContinue}
          disabled={saveLoading}
          sx={{
            '&:hover': {
              backgroundColor: 'var(--button-bg)',
              borderRadius: 'var(--button-border-radius)',
            },
            color: 'var(--default-color)',
            fontFamily: 'var(--default-font-family)',
          }}
        >
          {saveLoading ? (
            <CircularProgress size={24} sx={{ color: 'var(--default-color)' }} />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
