import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';

// 질문 1. 여기서도 하나의 인스턴스로 보내는 것이 더 나아보이는데 그렇게 해도 되는것인지? + useNavigate도 하나의 인스턴스로 통일?
// 질문 2. Loading context를 만들어뒀는데 그를 그냥 여기서 사용하는 것이 제일 깔끔할 것 같은데 맞는지?
// 질문 3. 에러 분기를 한 번에 모아서 처리하는건 그냥 promise니까 ErrorBounday 컴포넌트에서 잡으면 되는건지? 그렇다면 status와 message 전달을 어떻게 하는것인지?
// -> context를 이용하기에는 error의 경우 따로 방안이 마련되어 있을 것 같다는 느낌.

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
