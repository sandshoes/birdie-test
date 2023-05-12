import { useState, useEffect } from "react";

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnswerText = ({
  message,
  onComplete,
}: {
  message: string;
  onComplete: any;
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (message && index < message.length) {
      const interval = randomInteger(35, 75);
      const timer = setTimeout(() => {
        setText((prevText) => prevText + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, interval);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [index, message, onComplete]);
  return (
    <p>
      <strong>Answer:</strong> <span>{text}</span>
    </p>
  );
};

export default AnswerText;
