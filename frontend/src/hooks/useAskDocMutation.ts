import axios from "axios";
import { useMutation } from "react-query";

const useAskDocMutation = () => {
  return useMutation(async (inputValue: string) => {
    const askDoc = await axios.post("http://localhost:3000/llm/ask-doc", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer 123456789",
      },
      body: {
        query: inputValue,
      },
    });
    return askDoc.data;
  });
};

export default useAskDocMutation;
