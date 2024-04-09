import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoButton = () => {
  const handleLoginKakao = async () => {
    // const redirectUri = `${import.meta.env.VITE_API_URI}/api/oauth/kakao`;
    // window.Kakao.Auth.authorize({
    //   redirectUri
    // });
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=c84840525d9cdbf1a8ba40a6b6f62089&redirect_uri=http://localhost:4000/kakao';
  };
  return (
    <button onClick={handleLoginKakao} className="btn btn-warning w-full">
      카카오로 로그인
    </button>
  );
};

const NaverButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.redirect);
  };
  return (
    <button onClick={handleClick} className="btn btn-success w-full">
      네이버로 로그인
    </button>
  );
};

export { KakaoButton, NaverButton };
