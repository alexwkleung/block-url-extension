import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Error from './Error';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Error />
  </StrictMode>
);
