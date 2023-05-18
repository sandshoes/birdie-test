import { render, screen } from "@testing-library/react";
import Alerts from "./Alerts";
import useAlertsQuery from "../../hooks/useAlertsQuery";
import { QueryObserverIdleResult, QueryObserverResult } from "react-query";
import { Alert } from "../../types";
import { mockUseQueryAlerts } from "../../../__mocks__/mocks";

type UseAlertsQueryMock = jest.Mock<
  | QueryObserverResult<Alert[], unknown>
  | QueryObserverIdleResult<Alert[], unknown>
>;

jest.mock("../../hooks/useAlertsQuery", () => ({
  __esModule: true,
  default: jest.fn() as UseAlertsQueryMock,
  useAlertsQuery: jest.fn() as UseAlertsQueryMock,
}));

describe("Alerts", () => {
  it("renders the alerts correctly", () => {
    (useAlertsQuery as UseAlertsQueryMock).mockReturnValue({
      ...mockUseQueryAlerts,
      isLoading: false,
      isSuccess: true,
    });

    render(<Alerts />);
    const dateAlertElement = screen.getByText(
      (content, element) =>
        element!.tagName.toLowerCase() === "td" &&
        content.includes("Sat, 01 January 2022 at 01:00 AM")
    );
    expect(dateAlertElement).toBeInTheDocument();
  });

  it("does not render alerts when there are no alerts", () => {
    (useAlertsQuery as UseAlertsQueryMock).mockReturnValue({
      ...mockUseQueryAlerts,
      data: [],
      status: "success",
      isLoading: false,
      isSuccess: true,
    });
    render(<Alerts />);
    const emptyAlertsElement = screen.getByText(/no alerts found/i);
    expect(emptyAlertsElement).toBeInTheDocument();
  });
});
