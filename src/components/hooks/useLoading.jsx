import { useContext } from 'react';
import { LoadingContext } from '../common/LoadingContext';

const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  if (setIsLoading === undefined) {
    throw new Error('useLoadingState should be used within LoadingProvider');
  }
  return {
    isLoading,
    setIsLoading
  };
};

export default useLoading;
