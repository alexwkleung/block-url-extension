import { useState, useContext, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { MonacoEditorContext } from '../MonacoEditor/context/MonacoEditorContext';
import { isValidUrl } from '../../../utils/is-valid-url';
import Tooltip from '@mui/material/Tooltip';
import { platform } from '../../../utils/platform';
import { urlPatterns } from '../../../utils/url-patterns';
import { SaveDialog } from '../SaveDialog/SaveDialog';
import { SaveAlert } from '../Alert/SaveAlert';
import { ErrorSaveAlert } from '../Alert/ErrorSaveAlert';

import type { UrlData } from '../../../types/url-data';

import './SaveButton.css';

const SaveButton = ({ isPressedKeySave }: { isPressedKeySave: boolean }) => {
  const { editor } = useContext(MonacoEditorContext);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const [errorSaveAlert, setErrorSaveAlert] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const saveKeyTitle: string = `Save ${platform.isMac ? '(⌘+S)' : '(Ctrl+S)'}`;

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
      <SaveDialog
        saveDialogOpen={saveDialogOpen}
        saveButtonClose={saveButtonClose}
        saveLoading={saveLoading}
        saveButtonContinue={saveButtonContinue}
      />
      {saveAlert ? <SaveAlert saveAlert={saveAlert} alertOnClose={alertOnClose} /> : null}
      {errorSaveAlert ? (
        <ErrorSaveAlert errorSaveAlert={errorSaveAlert} alertOnClose={alertOnClose} />
      ) : null}
    </>
  );
};

export default SaveButton;
