import { useState, useContext, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { MonacoEditorContext } from '../MonacoEditor/context/MonacoEditorContext';
import { isValidUrl } from '../../../utils/is-valid-url';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import { platform } from '../../../utils/platform';

import type { UrlData } from '../../../types/url-data';

const SaveButton = ({ isPressedKeySave }: { isPressedKeySave: boolean }) => {
  const { editor } = useContext(MonacoEditorContext);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const [saveAlert, setSaveAlert] = useState(false);

  useEffect(() => {
    // save key is pressed
    if (isPressedKeySave) {
      setSaveDialogOpen(true);
    }
  }, [isPressedKeySave]);

  const saveButtonOpen = () => {
    setSaveDialogOpen(true);
  };

  const saveButtonClose = () => {
    setSaveDialogOpen(false);
  };

  const saveButtonContinue = () => {
    setSaveDialogOpen(false);

    if (editor) {
      // current editor value
      const editorValue: string = editor.getValue();

      // all urls from the editor regardless if they are valid or invalid
      const editorUrls: string[] = editorValue.split('\n');

      // array containing all possible valid urls
      const validUrls: string[] = editorUrls.filter((url: string): boolean => isValidUrl(url));

      // object of url related data to be stored
      const urlData: UrlData = {
        editorValue: editorValue,
        validUrls: validUrls,
      };

      chrome.storage.local.set(urlData);

      setSaveAlert(true);
    }
  };

  const alertOnClose = () => {
    setSaveAlert(false);
  };

  const saveKeyTitle: string = `Save ${
    platform.platformMac.includes(platform.agentPlatform) ? '(⌘+S)' : '(Ctrl+S)'
  }`;

  return (
    <>
      <Tooltip
        title={saveKeyTitle}
        slotProps={{
          tooltip: {
            sx: {
              fontSize: '18px',
            },
          },
        }}
      >
        <SaveIcon
          onClick={saveButtonOpen}
          sx={{
            fontSize: '50px',
            '&:hover': {
              backgroundColor: '#4e4e4e',
              borderRadius: '10px',
            },
            padding: '5px',
            marginLeft: '50px',
            color: '#d4d4d4',
          }}
        />
      </Tooltip>
      <Dialog open={saveDialogOpen} onClose={saveButtonClose} disableRestoreFocus>
        <DialogTitle>Save All URLs?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to save all valid URLs?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveButtonClose}>Cancel</Button>
          <Button onClick={saveButtonContinue}>Save</Button>
        </DialogActions>
      </Dialog>
      {saveAlert ? (
        <Snackbar
          autoHideDuration={3500}
          open={saveAlert}
          onClose={alertOnClose}
          disableWindowBlurListener={true}
        >
          <Alert
            icon={false}
            onClose={alertOnClose}
            sx={{ backgroundColor: '#8bc34a', color: '#000000' }}
          >
            Successfully saved URLs
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default SaveButton;
