import useAxios from '../../components/hooks/useAxios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Load from '../Homepages/Loading';
import Naver from './Naver';

const Kakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { response } = useAxios({
    url: `/api/oauth/kakao${location.search}`,
    shouldInitFetch: true
  });

  // 트리 여부에 따른 분기 처리 함수
  const navigateTree = (treeId) => {
    if (treeId === null) {
      navigate('/host/question');
    } else {
      navigate(`/host/tree/${treeId}`);
    }
  };

  // 응답이 왔을 때 분기 처리 함수 호출
  useEffect(() => {
    if (response) {
      navigateTree(response.treeId);
    }
  }, [response]);
  return <Naver />;
};

export default Kakao;
