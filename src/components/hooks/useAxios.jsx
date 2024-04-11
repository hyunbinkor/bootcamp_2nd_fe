import { useEffect, useState } from 'react';
import axios from 'axios';

// 질문 1. 여기서도 하나의 인스턴스로 보내는 것이 더 나아보이는데 그렇게 해도 되는것인지? + useNavigate도 하나의 인스턴스로 통일?
// 질문 2. Loading context를 만들어뒀는데 그를 그냥 여기서 사용하는 것이 제일 깔끔할 것 같은데 맞는지?
// 질문 3. 에러 분기를 한 번에 모아서 처리하는건 그냥 promise니까 ErrorBounday 컴포넌트에서 잡으면 되는건지? 그렇다면 status와 message 전달을 어떻게 하는것인지?
// -> context를 이용하기에는 error의 경우 따로 방안이 마련되어 있을 것 같다는 느낌.

const useAxios = (configParams) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const [res, setRes] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDataUsingAxios(configParams);
  }, []);
  const fetchDataUsingAxios = async () => {
    await axios
      .request(configParams)
      .then((res) => setRes(res))
      .catch((err) => setErr(err))
      .finally(() => setLoading(false));
  };
  return [res, err, loading];
};
export default useAxios;

/**
 * @description 아래 코드로 사용하면 됨
import { useEffect, useState } from "react/cjs/react.development";
import useAxios from "./useAxios";
const YourComponent = () => {
     const [data, setData] = useState(null);
     const [todo, isError, isLoading] = useAxios({
           url: '/todos/2',
           method: 'get',
           body: {...},
           headers: {...}
     });
     use Effect(() => {
        if(todo && todo.data) setData(todo.data)
     }, [todo]);
     return (
       <> {isLoading ? (
            <p>isLoading...</p>
       ) : (
           <div>
                {isError && <p>{isError.message}</p>}
                {data && <p>{data.title}</p>}</div>
           </div>
        )} </>
      )
}
export default YourComponent;
 */
