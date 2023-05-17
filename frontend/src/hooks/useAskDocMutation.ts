import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../AuthContext";

const useAskDocMutation = () => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  return useMutation(async (inputValue: string) => {
    const askDoc = await axios.post("http://localhost:3000/llm/ask-doc", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        query: inputValue,
      },
    });
    return askDoc.data;
  });
};

export default useAskDocMutation;
