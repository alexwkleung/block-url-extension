import ClearIcon from '@mui/icons-material/Clear';

const ClearButton = () => {
  return (
    <ClearIcon
      sx={{ fontSize: '50px', '&:hover': { backgroundColor: 'lightgrey' }, padding: '5px' }}
    />
  );
};

export default ClearButton;
