import { createContext, useEffect, useState } from 'react';
import Load from '../../pages/Homepages/Loading';

export const LoadingContext = createContext({
  setIsLoading: () => {}
});

function LoadingProvider(props) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <Load />}
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
