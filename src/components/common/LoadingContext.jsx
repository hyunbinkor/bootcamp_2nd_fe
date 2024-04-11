import { createContext, useContext, useMemo, useState } from 'react';

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const actions = useMemo(
    () => ({
      startLoading() {
        setIsLoading(true);
      },
      endLoading() {
        setIsLoading(false);
      }
    }),
    []
  );

  const value = useMemo(() => [isLoading, actions], [isLoading, actions]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

function useLoading() {
  const value = useContext(LoadingContext);
  if (value === undefined) {
    throw new Error('useLoadingState should be used within LoadingProvider');
  }
  return value;
}

export { LoadingProvider, useLoading };
