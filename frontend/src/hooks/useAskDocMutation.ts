import axios from "axios";
import { useMutation } from "react-query";

const useAskDocMutation = () => {
  return useMutation(async (inputValue: string) => {
    const askDoc = await axios.post("http://localhost:3000/event/ask-doc", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer 123456789",
      },
      body: {
        query: inputValue,
      },
    });
    console.log('ask doc truth', askDoc)
    return askDoc.data;
  });
};

export default useAskDocMutation;
