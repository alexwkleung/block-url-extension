import { useState, useContext } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { MonacoEditorContext } from '../MonacoEditor/context/MonacoEditorContext';
import { isValidUrl } from '../../../utils/is-valid-url';

import type { UrlData } from '../../../types/url-data';

const SaveButton = () => {
  const { editor } = useContext(MonacoEditorContext);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

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
    }
  };

  return (
    <>
      <SaveIcon
        onClick={saveButtonOpen}
        sx={{
          fontSize: '50px',
          '&:hover': { backgroundColor: 'lightgrey' },
          padding: '5px',
        }}
      />
      <Dialog open={saveDialogOpen} onClose={saveButtonClose}>
        <DialogTitle>Save All URLs?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to save all valid URLs?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveButtonClose}>Cancel</Button>
          <Button onClick={saveButtonContinue}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
