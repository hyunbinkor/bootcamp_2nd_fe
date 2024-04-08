import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/atom/Modal';

const Questions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 사용자의 로그인 상태
  const [hasTree, setHasTree] = useState(false); // 트리 보유 여부
  const [currentIndex, setCurrentIndex] = useState(0); //질문 index
  const [answers, setAnswers] = useState({
    ok: '',
    nickName: '',
    color: '',
    url: ''
  });
  const inputFieldNames = ['ok', 'nickName', 'color', 'url'];
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const questions = [
    '트리를 만들기 전에 몇 가지 질문에 대답해줘😃',
    '너를 부르는 별명을 알려줘!',
    '너는 어떤 색깔을 좋아해? 🎨',
    '트리 이름을 지어줘! 🎄'
  ];
  const [clickedIndex, setClickedIndex] = useState(null);

  // input 답변내역 저장
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if (/^[a-zA-Z]*$/.test(value)) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [fieldName]: value
      }));
    }
  };

  // button 답변내역 저장
  const handleButtonClick = (index, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [inputFieldNames[currentIndex]]: answer
    }));
    setClickedIndex(index);
  };

  // 각 질문마다 다음 버튼을 눌렀을 때 질문 이동
  const handleNextClick = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 각 질문마다 이전 버튼을 눌렀을 때 질문 이동
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 마지막 질문에서 완료 버튼을 눌렀을 때 모달 생성
  const handleCompleteClick = () => {
    setShowModal(true);
  };

  // 모달창에서 닫기 버튼을 눌렀을 때 모달 해제
  const handleModalClose = () => {
    setShowModal(false);
  };

  // 모달창에서 완료 버튼을 눌렀을때 백으로 답변 내역을 보내고, 모달 해제, tree 페이지로 이동
  const handleModalComplete = () => {
    // axios.post('/api/answers', answers)  //api 요청시 주석해제
    //   .then((response) => {
    console.log('Answers:', answers);
    setShowModal(false);
    navigate('/host/tree/{:id}');
    // })
    // .catch((error) => {
    //   console.error('Error posting answers:', error);
    // });
  };

  // 각 단계마다 답변이 입력되었는지 확인
  const isAnswerEntered = (index) => {
    return answers[inputFieldNames[index]] !== '';
  };

  return (
    <div className="min-h-screen px-5 pt-20 py-px_15 relative text-neutral-content font-custom">
      <div className="py-px_120 pl-5  text-xl font-bold">
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
            className="border-b  text-black bg-bgcolor px-3 py-2 mt-40 align-center text-center outline-none"
          />
        ) : (
          <div className="flex justify-center text-xl font-bold">
            {currentIndex === 0 ? (
              <div className="flex flex-col max-w-full gap-4 mt-16">
                <button
                  className={`border border-stcolor px-32 py-4 rounded-md ${clickedIndex === 0 ? 'bg-tbcolor' : ''}`}
                  onClick={() => handleButtonClick(0, '응')}
                >
                  응
                </button>
                <button
                  className={`border border-stcolor px-32 py-4 rounded-md ${clickedIndex === 1 ? 'bg-tbcolor' : ''}`}
                  onClick={() => handleButtonClick(1, '아니오')}
                >
                  그래
                </button>
              </div>
            ) : currentIndex === 2 ? (
              <div className="flex flex-col max-w-full gap-4 mt-16">
                <button
                  className={`border border-stcolor px-32 py-4 max-w-full rounded-md ${clickedIndex === 2 ? 'bg-tbcolor' : ''}`}
                  onClick={() => handleButtonClick(2, 'Blue')}
                >
                  Blue
                </button>
                <button
                  className={`border border-stcolor px-32 py-4 rounded-md ${clickedIndex === 3 ? 'bg-tbcolor' : ''}`}
                  onClick={() => handleButtonClick(3, 'Green')}
                >
                  Green
                </button>
                <button
                  className={` border border-stcolor  px-32 py-4 rounded-md ${clickedIndex === 4 ? 'bg-tbcolor' : ''}`}
                  onClick={() => handleButtonClick(4, 'Yellow')}
                >
                  Yellow
                </button>
              </div>
            ) : null}
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
          message="작성하신 내용은 수정이 어려워요. <br/> 신중하게 작성해 주세요!"
          onClose={handleModalClose}
          onComplete={handleModalComplete}
        />
      )}
    </div>
  );
};

export default Questions;
