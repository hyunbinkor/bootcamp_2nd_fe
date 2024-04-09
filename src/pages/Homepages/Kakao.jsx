import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';

const Kakao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [treeid, setTreeid] = useState(null);
  useEffect(() => {
    async function hasTree() {
      const params = await new URLSearchParams(location.search);
      const response = await axios.get(`/api/oauth/kakao?${params}`);
      setTreeid(response.data.treeid);
    }
    hasTree();
    if (treeid) navigate(`/host/tree/${treeid}`);
    navigate('/host/question');
    return () => {};
  }, []);
  return <div>카카오</div>;
};

export default Kakao;
