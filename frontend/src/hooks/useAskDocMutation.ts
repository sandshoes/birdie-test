import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../AuthContext";

const useAskDocMutation = () => {
  const auth = useAuth();
  return useMutation(async (inputValue: string) => {
    const accessToken = auth.session?.access_token;
    console.log("access token", accessToken);
    if (!accessToken) {
      throw new Error("Access token is not available");
    }
    console.log(
      "making request wiht access token",
      accessToken,
      inputValue,
      "hey there"
    );
    const askDoc = await axios.post(
      `${import.meta.env.VITE_API_URL}llm/ask-doc`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          query: inputValue,
        },
      }
    );
    return askDoc.data;
  });
};

export default useAskDocMutation;
