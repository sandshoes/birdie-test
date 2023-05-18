// import { render, screen } from "@testing-library/react";
// import AskDoc from "./AskDoc";
// import { QueryObserverIdleResult, QueryObserverResult } from "react-query";

// type UseAskDocMock = jest.Mock<
//   | QueryObserverResult<string, unknown>
//   | QueryObserverIdleResult<string, unknown>
// >;

// jest.mock("../../hooks/useAskDocMutation", () => ({
//   __esModule: true,
//   default: jest.fn() as UseAskDocMock,
//   useASkDocMutation: jest.fn() as UseAskDocMock,
// }));

// describe("AskDoc", () => {
//   beforeEach(() => {
//     // Reset the mock implementation before each test
//     mockUseAskDocMutation.mockReset();
//   });

//   it("renders the question and answer correctly", () => {
//     const question = "What is the capital of France?";
//     const answer = "The capital of France is Paris.";
//     render(<AskDoc />);
//     const questionElement = screen.getByText(
//       /what is the capital of france\?/i
//     );
//     const answerElement = screen.getByText(/the capital of france is paris\./i);
//     expect(questionElement).toBeInTheDocument();
//     expect(answerElement).toBeInTheDocument();
//   });
// });
