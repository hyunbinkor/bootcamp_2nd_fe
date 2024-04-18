import { createContext, useContext, useMemo, useState } from 'react';
import Load from '../../pages/Homepages/Loading';

export const LoadingContext = createContext({
  showLoading: () => {},
  hideLoading: () => {}
});

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {isLoading ?? <Load />}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
