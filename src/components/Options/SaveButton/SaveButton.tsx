import SaveIcon from '@mui/icons-material/Save';

const SaveButton = () => {
  const saveIconOnClick = () => {
    console.log('[Click]: Save icon');
  };

  return (
    <SaveIcon
      onClick={saveIconOnClick}
      sx={{
        fontSize: '50px',
        '&:hover': { backgroundColor: 'lightgrey' },
        padding: '5px',
      }}
    />
  );
};

export default SaveButton;
