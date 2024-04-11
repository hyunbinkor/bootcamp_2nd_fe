import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const useAxios = (configParams) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const controllerRef = useRef(new AbortController());

  const refetch = () => {
    setResponse([...response]);
    setError(error);
    setLoading(true);
    setTrigger(Date.now());
  };

  const fetchDataUsingAxios = async () => {
    await axiosInstance
      .request({
        ...configParams,
        signal: controllerRef.current.signal
      })
      .then((response) => setRes(response?.data?.data))
      .catch((error) => setErr(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDataUsingAxios(configParams);
  }, [trigger]);

  return { response, error, loading, setResponse, refetch };
};

export default useAxios;

/**
 * @description 아래 코드로 사용하면 됨
const YourComponent = () => {
     const [data, setData] = useState(null);
     const { response, error, loading, setResponse, refetch } = useAxios({
           url: '/todos/2',
           method: 'get',
           body: {...},
           headers: {...}
     });
     return (
       <> {loading ? (
            <p>isLoading...</p>
       ) : (
           <div>
                {error && <p>{error.message}</p>}
                {response && <p>{response}</p>}</div>
           </div>
        )} </>
      )
}
export default YourComponent;
 */
