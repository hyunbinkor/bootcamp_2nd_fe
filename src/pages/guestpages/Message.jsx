import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Message(props) {
  const [input, setInput] = useState("");

  const location = useLocation();
  const { image, uniqueId } = location.state;

  console.log(location.state);

  const addNote = async () => {
    const url = `/api/message/${treeId}/write`;
    try {
      const response = await axios.post(url, {
        text: input,
        image: image,
      });
      console.log("메시지가 성공적으로 전송되었습니다.", response.data);
      setInput("");
    } catch (error) {
      console.error("메시지 전송에 실패했습니다.", error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-semibold mb-4 ">메세지를 남겨주세요!</h1>
      <textarea
        className="shadow-lg px-2 resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "298px",
          height: "372px",
          overflowY: "auto",
          lineHeight: "31px",
          backgroundImage: `repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px)`,
          backgroundAttachment: "local",
          backgroundRepeat: "repeat-y",
        }}
      ></textarea>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={addNote}
      >
        메세지 남기기
      </button>
    </div>
  );
}

export default Message;
