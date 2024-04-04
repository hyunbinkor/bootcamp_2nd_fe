import { useNavigate } from "react-router-dom";

const KakaoButton = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.redirect);
  };
  return (
    <button onClick={handleClick} className="btn btn-warning w-full">
      카카오로 로그인
    </button>
  );
};

const NaverButton = (props) => {
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
