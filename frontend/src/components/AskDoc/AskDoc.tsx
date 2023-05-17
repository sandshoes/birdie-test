import { useState } from "react";
import useAskDocMutation from "../../hooks/useAskDocMutation";
import AnswerText from "./AnswerText";
import "./AskDoc.css";

const AskDoc = () => {
  const [inputValue, setInputValue] = useState(
    "How many check ins has the care recipient had in May?"
  );
  const [isAsking, setIsAsking] = useState(false);
  const askDocMutation = useAskDocMutation();

  const handleSubmit = () => {
    setIsAsking(true);
    askDocMutation.mutate(inputValue);
  };

  const handleComplete = () => {
    setIsAsking(false);
  };

  return (
    <div className="ask-doc-container">
      <p className="ask-doc-title">Ask our Birdie Doc</p>
      <div className="ask-doc-area">
        <div className="question-container">
          <textarea
            value={inputValue}
            className="question-area"
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            disabled={askDocMutation.isLoading && !isAsking}
          >
            Ask
          </button>
        </div>
        {askDocMutation.isError && <p>Error: {String(askDocMutation.error)}</p>}
        <div className="doc-box">
          <AnswerText
            message={askDocMutation.data}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default AskDoc;
