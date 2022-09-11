import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//contexts
import { DataContextWrapper } from './contexts/DataContext';
import { AuthContextWrapper } from './contexts/AuthContext';
import { ModeContextWrappper } from './contexts/ModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextWrapper>
      <DataContextWrapper>
        <ModeContextWrappper>
          <App />
        </ModeContextWrappper>
      </DataContextWrapper>
    </AuthContextWrapper>
  </React.StrictMode>
);

