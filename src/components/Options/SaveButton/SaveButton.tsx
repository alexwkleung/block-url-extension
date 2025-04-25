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
import { urlPatterns } from '../../../utils/url-patterns';
import CircularProgress from '@mui/material/CircularProgress';

import type { UrlData } from '../../../types/url-data';

import './SaveButton.css';

const SaveButton = ({ isPressedKeySave }: { isPressedKeySave: boolean }) => {
  const { editor } = useContext(MonacoEditorContext);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const [errorSaveAlert, setErrorSaveAlert] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

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

  const saveButtonContinue = async () => {
    setSaveLoading(true);

    setTimeout(() => {
      if (editor) {
        // current editor value
        const editorValue: string = editor.getValue();

        // all urls from the editor regardless if they are valid or invalid
        const editorUrls: string[] = editorValue.split('\n');

        // array containing all possible valid urls
        const validUrls: string[] = editorUrls.filter((url: string): boolean => isValidUrl(url));

        // size of valid urls array
        const validUrlsSize: number | null = Object.keys(
          validUrls.filter(
            (url: string) =>
              // comments are filtered out
              !url.startsWith(urlPatterns.doubleSlashCommentStr) &&
              !url.startsWith(urlPatterns.hashCommentStr)
          )
        ).length;

        // object of url related data to be stored
        const urlData: UrlData = {
          editorValue: editorValue,
          validUrls: validUrls,
          validUrlsSize: validUrlsSize,
        };

        chrome.storage.local
          .set(urlData)
          .then(() => {
            setSaveDialogOpen(false);
            setSaveAlert(true);
          })
          .catch((err) => {
            console.error('[Chrome Storage]: ', err);
            setSaveDialogOpen(false);
            setErrorSaveAlert(true);
          })
          .finally(() => {
            setSaveLoading(false);
          });
      }
    }, 250);
  };

  const alertOnClose = () => {
    setSaveAlert(false);
    setErrorSaveAlert(false);
  };

  const saveKeyTitle: string = `Save ${platform.isMac ? '(⌘+S)' : '(Ctrl+S)'}`;

  return (
    <>
      <Tooltip
        title={saveKeyTitle}
        slotProps={{
          tooltip: {
            sx: {
              fontSize: '18px',
              fontFamily: 'var(--default-font-family)',
            },
          },
        }}
      >
        <SaveIcon
          onClick={saveButtonOpen}
          sx={{
            fontSize: '50px',
            '&:hover': {
              backgroundColor: 'var(--button-bg)',
              borderRadius: 'var(--button-border-radius)',
            },
            padding: 'var(--button-padding)',
            marginLeft: '50px',
            color: 'var(--default-color)',
          }}
        />
      </Tooltip>
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
        <DialogTitle
          sx={{ color: 'var(--default-color)', fontFamily: 'var(--default-font-family)' }}
        >
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
            sx={{
              backgroundColor: 'var(--success-alert-bg)',
              color: 'var(--alert-color)',
              fontFamily: 'var(--default-font-family)',
            }}
          >
            Successfully saved URLs
          </Alert>
        </Snackbar>
      ) : null}
      {errorSaveAlert ? (
        <Snackbar
          autoHideDuration={3500}
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
            Error: Unable to save URLs
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default SaveButton;
