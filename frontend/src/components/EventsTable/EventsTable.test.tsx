import { render, screen } from "@testing-library/react";
import EventsTable from "./EventsTable";
import useEvents from "../../hooks/useEvents";
import { QueryObserverIdleResult, QueryObserverResult } from "react-query";
import { Event } from "../../types";
import { mockUseQuery } from "../../../__mocks__/mocks";

type UseEventsMock = jest.Mock<
  | QueryObserverResult<Event[], unknown>
  | QueryObserverIdleResult<Event[], unknown>
>;

jest.mock("../../hooks/useEvents", () => ({
  __esModule: true,
  default: jest.fn() as UseEventsMock,
  useEvents: jest.fn() as UseEventsMock,
}));

describe("EventsTable", () => {
  it("renders the table header", () => {
    (useEvents as UseEventsMock).mockReturnValue({
      ...mockUseQuery,
      isLoading: false,
      isSuccess: true,
    });
    render(<EventsTable />);
    const headerElement = screen.getAllByText(/event type/i);
    expect(headerElement).toHaveLength(2);
  });

  it("renders the loading message when events are loading", () => {
    (useEvents as UseEventsMock).mockReturnValue({
      ...mockUseQuery,
      data: undefined,
      status: "loading",
      isLoading: true,
      isSuccess: false,
    });

    render(<EventsTable />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the empty events message when no events are found", () => {
    (useEvents as UseEventsMock).mockReturnValue({
      ...mockUseQuery,
      data: [],
      status: "success",
      isLoading: false,
      isSuccess: true,
    });
    render(<EventsTable />);
    const emptyEventsElement = screen.getByText(/no events found/i);
    expect(emptyEventsElement).toBeInTheDocument();
  });

  it("renders the events data when events are loaded", () => {
    (useEvents as UseEventsMock).mockReturnValue({
      ...mockUseQuery,
    });
    render(<EventsTable />);
    const eventTypeElement = screen.getAllByText(/Check In/i);
    const timestampElement = screen.getByText(/Sat, 01 January 2022 at 01:00 AM/i);
    expect(eventTypeElement).toHaveLength(2);
    expect(timestampElement).toBeInTheDocument();
  });
});
