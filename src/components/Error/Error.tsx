import ErrorIcon from '@mui/icons-material/Error';

import './Error.css';

const Error = () => {
  return (
    <div className="error-container h-screen flex items-center justify-center">
      <div className="error-box flex items-center">
        <ErrorIcon
          sx={{
            fill: '#ffc107',
            height: '45px',
            width: '75px',
            padding: '5px',
          }}
        />
        <h1 className="error-heading text-5xl">This URL has been blocked!</h1>
      </div>
    </div>
  );
};

export default Error;
