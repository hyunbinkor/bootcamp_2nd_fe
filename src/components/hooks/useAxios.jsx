import { useEffect, useState } from 'react';
import axios from 'axios';

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
