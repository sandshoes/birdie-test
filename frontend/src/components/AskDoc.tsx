import { useState } from "react";
import useAskDocMutation from "../hooks/useAskDocMutation";

const AskDoc = () => {
  const [inputValue, setInputValue] = useState("");
  const askDocMutation = useAskDocMutation();

  const handleSubmit = () => {
    askDocMutation.mutate(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={askDocMutation.isLoading}>
        Send Data
      </button>
      {askDocMutation.isError && <p>Error: {askDocMutation.error.message}</p>}
      {askDocMutation.isSuccess && <p>Data sent successfully!</p>}
    </div>
  );
};

export default AskDoc;
