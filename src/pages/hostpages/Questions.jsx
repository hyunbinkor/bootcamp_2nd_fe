import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/atom/Modal';
import axios from 'axios';
import useAxios from '../../components/hooks/useAxios';
import DogCanvas from './DogCanvas';
import DuckCanvas from './DuckCanvas';
import BearCanvas from './BearCanvas';
import './animation.css';

const inputFieldNames = ['ok', 'nickName', 'animal', 'treeName'];

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0); //질문 index
  const [answers, setAnswers] = useState({
    ok: '',
    nickName: '',
    animal: '',
    treeName: ''
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const questions = [
    '트리를 만들기 전에 몇 가지 질문에 대답해줘 😃',
    '너를 부르는 별명을 알려줘!',
    '너는 어떤 동물을 좋아해? 🎨',
    '트리 이름을 지어줘! 🎄'
  ];
  const [currentCanvas, setCurrentCanvas] = useState('DogCanvas');
  const [animation, setAnimation] = useState('');
  const [clickedIndex, setClickedIndex] = useState(null);
  const { response, trigger } = useAxios({
    method: 'post',
    url: '/api/tree/add'
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldName]: value
    }));
  };
  // input 답변내역 저장
  const handleEngInputChange = (e, fieldName) => {
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
    console.log('Answers:', answers);
    trigger({
      data: answers
    });
  };

  useEffect(() => {
    if (response) {
      setShowModal(false);
      navigate(`/host/tree/${response.treeData.treeId}`);
    }
  }, [response]);

  // 각 단계마다 답변이 입력되었는지 확인
  const isAnswerEntered = (index) => {
    return answers[inputFieldNames[index]] !== '';
  };

  // 화살표 클릭 시 애니메이션을 적용하는 로직
  const handleRightClick = (nextCanvas) => {
    // nextCanvas 파라미터 추가
    setAnimation('slide-out-left');
    setTimeout(() => {
      setCurrentCanvas(nextCanvas);
      setAnimation('slide-in-right');
    }, 500); // 500ms 후에 캔버스 변경 및 애니메이션 적용
  };

  // 좌측 화살표 클릭 시 실행되는 함수
  const handleLeftClick = (nextCanvas) => {
    setAnimation('slide-out-right');
    setTimeout(() => {
      setCurrentCanvas(nextCanvas);
      setAnimation('slide-in-left');
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(''); // 애니메이션 종료 후 클래스 초기화
    }, 500);

    return () => clearTimeout(timer);
  }, [currentCanvas]);

  const renderAnswerInputFromCurrentIndex = useCallback(() => {
    const mapIndexToElement = {
      0: (
        <div className="flex flex-col max-w-full gap-4 mt-16">
          <button
            className={`border border-stcolor px-32 py-4 rounded-md ${clickedIndex === 0 ? 'bg-tbcolor' : ''}`}
            onClick={() => handleButtonClick(0, '응')}
          >
            응
          </button>
          <button
            className={`border border-stcolor px-32 py-4 rounded-md ${clickedIndex === 1 ? 'bg-tbcolor' : ''}`}
            onClick={() => handleButtonClick(1, '그래')}
          >
            그래
          </button>
        </div>
      ),
      1: (
        <input
          type="text"
          value={answers[inputFieldNames[currentIndex]]}
          onChange={(e) => handleInputChange(e, inputFieldNames[currentIndex])}
          className="border-b text-black bg-bgcolor px-3 py-2 mt-40 align-center text-center outline-none"
        />
      ),
      2: (
        <div>
          <div
            className=" z-10 absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              if (currentCanvas === 'DogCanvas') {
                handleLeftClick('DuckCanvas');
              } else if (currentCanvas === 'DuckCanvas') {
                handleLeftClick('BearCanvas');
              } else {
                handleLeftClick('DogCanvas');
              }
            }}
          >
            &lt;
          </div>
          <div
            className="z-10 absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              if (currentCanvas === 'DogCanvas') {
                handleRightClick('DuckCanvas');
              } else if (currentCanvas === 'DuckCanvas') {
                handleRightClick('BearCanvas');
              } else {
                handleRightClick('DogCanvas');
              }
            }}
          >
            &gt;
          </div>
          <div className={animation}>
            {currentCanvas === 'DogCanvas' ? (
              <DogCanvas handleButtonClick={handleButtonClick} />
            ) : currentCanvas === 'DuckCanvas' ? (
              <DuckCanvas handleButtonClick={handleButtonClick} />
            ) : (
              <BearCanvas handleButtonClick={handleButtonClick} />
            )}
          </div>
        </div>
      ),
      3: (
        <input
          type="text"
          placeholder="영문으로 입력해 주세요."
          value={answers[inputFieldNames[currentIndex]]}
          onChange={(e) =>
            handleEngInputChange(e, inputFieldNames[currentIndex])
          }
          className="border-b text-black bg-bgcolor px-3 py-2 mt-40 align-center text-center outline-none"
        />
      )
    };
    return mapIndexToElement[currentIndex];
  }, [
    currentIndex,
    answers,
    clickedIndex,
    handleButtonClick,
    handleInputChange
  ]);

  return (
    <div className="min-h-screen px-5 pt-20 py-px_15 relative text-neutral-content font-custom">
      <div className="py-px_120 pl-5  text-xl font-bold">
        {questions[currentIndex]}
      </div>
      <div className="flex justify-center">
        {renderAnswerInputFromCurrentIndex()}
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
            className={`absolute bottom-12 right-0 mt-3 px-8 line-height-8 cursor-pointer ${isAnswerEntered(currentIndex) ? '' : 'pointer-events-none text-gray-400'}`}
            onClick={
              isAnswerEntered(currentIndex) ? handleCompleteClick : undefined
            }
          >
            완료
          </div>
        )}
        {currentIndex !== questions.length - 1 && (
          <div
            className={`absolute bottom-12 right-0 mt-3 px-8 line-height-8 cursor-pointer ${isAnswerEntered(currentIndex) ? '' : 'pointer-events-none text-gray-400'}`}
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
  );
};

export default Questions;
