import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useLoading } from '../common/LoadingContext';
import { useErrorBoundary } from 'react-error-boundary';

const useAxios = ({
  method = 'get',
  url = '',
  data = {},
  applyResult = true,
  isShowBoundary = true,
  shouldSetError = true,
  shouldInitFetch = false
}) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const { actions } = useLoading();
  const { showBoundary } = useErrorBoundary();

  const trigger = async ({
    method: triggerMethod = method,
    url: triggerUrl = url,
    data: triggerData = data,
    applyResult: triggerApplyResult = applyResult,
    isShowBoundary: triggerIsShowBoundary = isShowBoundary,
    shouldSetError: triggerShouldSetError = shouldSetError
  }) => {
    actions.startLoading;
    await axiosInstance
      .request({
        url: triggerUrl,
        method: triggerMethod,
        data: triggerData
      })
      .then((triggerResponse) => {
        if (triggerApplyResult) {
          setResponse(triggerResponse);
        }
        return response;
      })
      .catch((triggerError) => {
        if (triggerShouldSetError) {
          setError(triggerError);
        }
        if (triggerIsShowBoundary) {
          showBoundary(triggerError);
        }
      })
      .finally(() => actions.endLoading);

    return response;
  };

  useEffect(() => {
    shouldInitFetch && console.log('초기 요청합니다!!', method, url);
    shouldInitFetch && trigger({ method, url, data });
  }, []);

  return { response, error, trigger };
};

export default useAxios;
