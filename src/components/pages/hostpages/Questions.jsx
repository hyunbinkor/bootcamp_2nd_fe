import React, { useState, useHistory } from 'react';
import Layout from '../../common/Layout';
import Modal from '../../atom/Modal';

const Questions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 사용자의 로그인 상태
  const [hasTree, setHasTree] = useState(false); // 트리 보유 여부
  const [currentIndex, setCurrentIndex] = useState(0); //질문 index
  const [answers, setAnswers] = useState({
    //답변
    ok: '',
    nickName: '',
    color: '',
    url: ''
  });
  const inputFieldNames = ['ok', 'nickName', 'color', 'url'];
  const [showModal, setShowModal] = useState(false);
  const questions = [
    '트리를 만들기 전에 몇 가지 질문에 대답해줘😃',
    '너를 부르는 별명을 알려줘!',
    '너는 어떤 색깔을 좋아해? 🎨',
    '트리 이름을 지어줘! 🎄'
  ];
  //   const history = useHistory();

  // 페이지가 로드될 때 사용자 정보를 가져오는 API 호출
  //   useEffect(() => {
  //     axios
  //       .get('/api/user/info')
  //       .then((response) => {
  //         const userInfo = response.data;
  //         setIsLoggedIn(userInfo.isLoggedIn);
  //         setHasTree(userInfo.hasTree);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  //  // 로그인 상태 및 트리 보유 여부에 따라 페이지 이동
  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       history.push('/home'); // 로그인 상태가 아닌 경우 홈으로 이동
  //     } else if (isLoggedIn && !hasTree) {
  //       history.push('/host/tree'); // 로그인은 되어 있지만 트리가 없는 경우 트리 호스팅 페이지로 이동
  //     }
  //   }, [isLoggedIn, hasTree, history]);

  // input 답변창
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldName]: value
    }));
  };

  // button 답변
  const handleButtonClick = (answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [inputFieldNames[currentIndex]]: answer
    }));
  };

  // 각 질문마다 다음 버튼을 눌렀을 때
  const handleNextClick = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 각 질문마다 이전 버튼을 눌렀을 때
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 마지막 질문에서 완료 버튼을 눌렀을 때
  const handleCompleteClick = () => {
    setShowModal(true);
  };

  // 모달창에서 닫기 버튼을 눌렀을 때
  const handleModalClose = () => {
    setShowModal(false);
  };

  // 모달창에서 완료 버튼을 눌렀을때
  // **to do: post 요청 추가 필요
  const handleModalComplete = () => {
    console.log('Answers:', answers);
    setShowModal(false);
  };

  // 모든 답변이 입력되었는지 확인하는 함수
  const isAnswerEntered = (index) => {
    return answers[inputFieldNames[index]] !== '';
  };

  return (
    <Layout>
      <div className="min-h-screen pl-5 pt-20 pr-5 py-px_15 relative">
        <div className="text-black py-px_120 pl-5 text-xl font-bold">
          {questions[currentIndex]}
        </div>
        <div className="flex justify-center">
          {currentIndex === 1 || currentIndex === 3 ? (
            <input
              type="text"
              value={answers[inputFieldNames[currentIndex]]}
              onChange={(e) =>
                handleInputChange(e, inputFieldNames[currentIndex])
              }
              className="border-b border-gray-500 text-black bg-white px-3 py-2 mt-40 align-center text-center outline-none"
            />
          ) : (
            <div className="flex justify-center">
              {currentIndex === 0 ? (
                <div className="flex flex-col max-w-full gap-4 mt-16">
                  <button
                    className="bg-blue-500 text-white px-32 py-4 max-w-full rounded-md"
                    onClick={() => handleButtonClick('응')}
                  >
                    응
                  </button>
                  <button
                    className="bg-green-500 text-white px-32 py-4 rounded-md"
                    onClick={() => handleButtonClick('아니오')}
                  >
                    그래
                  </button>
                </div>
              ) : currentIndex === 2 ? (
                <div className="flex flex-col max-w-full gap-4 mt-16">
                  <button
                    className="bg-blue-500 text-white px-32 py-4 max-w-full rounded-md"
                    onClick={() => handleButtonClick('Blue')}
                  >
                    Blue
                  </button>
                  <button
                    className="bg-green-500 text-white px-32 py-4 rounded-md"
                    onClick={() => handleButtonClick('Green')}
                  >
                    Green
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-32 py-4 rounded-md"
                    onClick={() => handleButtonClick('Yellow')}
                  >
                    Yellow
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 mt-10">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleButtonClick('Blue')}
                  >
                    Blue
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleButtonClick('Green')}
                  >
                    Green
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleButtonClick('Yellow')}
                  >
                    Yellow
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-black">
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 mt-20 px-8">
            {currentIndex + 1} / {questions.length}
          </div>
          {currentIndex > 0 && (
            <div
              className="absolute bottom-12 left-0 mt-3 px-8 line-height-8 cursor-pointer"
              onClick={handlePrevClick}
            >
              &larr; 이전
            </div>
          )}
          {currentIndex === questions.length - 1 && (
            <div
              className={`absolute bottom-12 right-0 mt-3 px-8 line-height-8 cursor-pointer ${
                isAnswerEntered(currentIndex)
                  ? ''
                  : 'pointer-events-none text-gray-400'
              }`}
              onClick={
                isAnswerEntered(currentIndex) ? handleCompleteClick : undefined
              }
            >
              완료
            </div>
          )}
          {currentIndex !== questions.length - 1 && (
            <div
              className={`absolute bottom-12 right-0 mt-3 px-8 line-height-8 cursor-pointer ${
                isAnswerEntered(currentIndex)
                  ? ''
                  : 'pointer-events-none text-gray-400'
              }`}
              onClick={
                isAnswerEntered(currentIndex) ? handleNextClick : undefined
              }
            >
              다음 &rarr;
            </div>
          )}
        </div>

        {showModal && (
          <Modal
            message="작성하신 내용은 수정이 어려워요. 신중하게 작성해 주세요!"
            onClose={handleModalClose}
            onComplete={handleModalComplete}
          />
        )}
      </div>
    </Layout>
  );
};

export default Questions;
