import { useState } from "react";
import useAskDocMutation from "../hooks/useAskDocMutation";
import AnswerText from "./AnswerText";

const AskDoc = () => {
  const [inputValue, setInputValue] = useState("");
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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={askDocMutation.isLoading && !isAsking}
      >
        Send Data
      </button>
      {askDocMutation.isError && <p>Error: {askDocMutation.error}</p>}
      {askDocMutation.isSuccess && <p>Data sent successfully!</p>}
      {askDocMutation.isSuccess && (
        <AnswerText message={askDocMutation.data} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default AskDoc;
