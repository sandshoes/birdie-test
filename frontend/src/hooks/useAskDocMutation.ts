import axios from "axios";
import { useMutation } from "react-query";

const useAskDocMutation = () => {
  return useMutation(
    async ({
      inputValue,
      accessToken,
    }: {
      inputValue: string;
      accessToken: string | undefined;
    }) => {
      if (!accessToken) {
        throw new Error("Access token is not available");
      }

      const askDoc = await axios.post(
        `${import.meta.env.VITE_API_URL}llm/ask-doc`,
        {
          query: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return askDoc.data;
    }
  );
};

export default useAskDocMutation;
