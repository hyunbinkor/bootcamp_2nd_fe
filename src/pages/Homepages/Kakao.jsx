import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';

const Kakao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkHasTree = async () => {
    const params = new URLSearchParams(location.search);
    const response = await axios.get(`/api/oauth/kakao?${params}`);
    const resultTreeId = response.data.TreeId;
    if (resultTreeId) return navigate(`/host/tree/${resultTreeId}`);
    navigate('/host/question');
  };
  useEffect(() => {
    checkHasTree();
  }, []);
  return <div>카카오</div>;
};

export default Kakao;
