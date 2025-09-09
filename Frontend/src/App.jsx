
import Router from './Router';
import { RoleContext } from './context/RoleContext';
import { getRoleFromToken } from './utils/getRoleFromToken';
import { Toaster } from 'react-hot-toast';

function App() {
  const role = getRoleFromToken();

  return (
    <RoleContext.Provider value={role}>
      <Router />
      <Toaster position="top-right" />
    </RoleContext.Provider>
  );
}

export default App;
