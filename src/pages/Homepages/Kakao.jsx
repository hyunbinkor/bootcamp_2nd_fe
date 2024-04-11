import useAxios from '../../components/hooks/useAxios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Load from '../Homepages/Loading';

const Kakao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkHasTree = async () => {
    const params = new URLSearchParams(location.search);
    const { response, error, loading, setResponse, refetch } = useAxios({
      url: `/api/oauth/kakao?${params}`,
      method: 'get'
    });
    const resultTreeId = response.TreeId;
    if (resultTreeId) return navigate(`/host/tree/${resultTreeId}`);
    navigate('/host/question');
  };
  useEffect(() => {
    checkHasTree();
  }, []);
  return <Load />;
};

export default Kakao;
