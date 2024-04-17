import { createContext, useContext, useMemo, useState } from 'react';
import Load from '../../pages/Homepages/Loading';

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const actions = useMemo(
    () => ({
      startLoading() {
        setIsLoading(true);
        console.log('로딩 시작');
      },
      endLoading() {
        setIsLoading(false);
        console.log('로딩 끝');
      }
    }),
    []
  );

  const value = useMemo(() => {
    return {
      isLoading,
      actions
    };
  }, [isLoading, actions]);

  return (
    <LoadingContext.Provider value={value}>
      {isLoading ? <Load /> : children}
    </LoadingContext.Provider>
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
