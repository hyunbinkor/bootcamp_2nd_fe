import { useContext } from 'react';
import { LoadingContext } from '../common/LoadingContext';

const useLoading = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  if (showLoading === undefined) {
    throw new Error('useLoadingState should be used within LoadingProvider');
  }
  return {
    showLoading,
    hideLoading
  };
};

export default useLoading;
