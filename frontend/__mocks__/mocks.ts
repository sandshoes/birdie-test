import { QueryObserverResult, QueryObserverSuccessResult } from "react-query";
import { Alert, Event } from "../src/types";

export const mockData: Event[] = [
  {
    id: 1,
    event_id: "sample-id",
    event_type: "check_in",
    care_recipient_id: "sample-id",
    payload: {},
    timestamp: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    event_id: "sample-id-2",
    event_type: "regular_medication_taken",
    care_recipient_id: "sample-id",
    payload: {},
    timestamp: "2022-03-01T00:00:00.000Z",
  },
];

export const mockAlerts: Alert[] = [
  {
    caregiver: "Random Name",
    matched: true,
    alert: {
      id: 1,
      event_id: "sample-id",
      event_type: "alert_raised",
      care_recipient_id: "sample-id",
      payload: {
        severity: 'HIGH'
      },
      timestamp: "2022-01-01T00:00:00.000Z",
    },
  },
  {
    caregiver: "Random Second",
    matched: false,
    alert: {
      id: 2,
      event_id: "sample-id-2",
      event_type: "alert_raised",
      care_recipient_id: "sample-id",
      payload: {},
      timestamp: "2022-03-01T00:00:00.000Z",
    },
  },
];

const mockRefetchResult: QueryObserverResult<Event[], unknown> = {
  data: mockData,
  error: null,
  isError: false,
  isFetching: false,
  isIdle: false,
  isLoading: false,
  isPreviousData: false,
  isSuccess: true,
  refetch: async () => mockRefetchResult,
  remove: () => {},
  isLoadingError: false,
  isRefetchError: false,
  status: "success",
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  isStale: false,
  isPlaceholderData: false,
  isFetched: true,
  isFetchedAfterMount: true,
  errorUpdateCount: 0,
  isRefetching: false,
};

export const mockUseQuery: QueryObserverSuccessResult<Event[], unknown> = {
  isLoading: false,
  isSuccess: true,
  data: mockData,
  error: null,
  isFetching: false,
  isError: false,
  isIdle: false,
  refetch: async () => mockRefetchResult,
  remove: () => {},
  isLoadingError: false,
  isRefetchError: false,
  status: "success",
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  isStale: false,
  isPlaceholderData: false,
  isFetched: true,
  isFetchedAfterMount: true,
  errorUpdateCount: 0,
  isRefetching: false,
  isPreviousData: false,
};

const mockRefetchAlerts: QueryObserverResult<Alert[], unknown> = {
  data: mockAlerts,
  error: null,
  isError: false,
  isFetching: false,
  isIdle: false,
  isLoading: false,
  isPreviousData: false,
  isSuccess: true,
  refetch: async () => mockRefetchAlerts,
  remove: () => {},
  isLoadingError: false,
  isRefetchError: false,
  status: "success",
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  isStale: false,
  isPlaceholderData: false,
  isFetched: true,
  isFetchedAfterMount: true,
  errorUpdateCount: 0,
  isRefetching: false,
};

export const mockUseQueryAlerts: QueryObserverSuccessResult<Alert[], unknown> =
  {
    isLoading: false,
    isSuccess: true,
    error: null,
    isFetching: false,
    isError: false,
    isIdle: false,
    remove: () => {},
    isLoadingError: false,
    isRefetchError: false,
    status: "success",
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: 0,
    failureCount: 0,
    isStale: false,
    isPlaceholderData: false,
    isFetched: true,
    isFetchedAfterMount: true,
    errorUpdateCount: 0,
    isRefetching: false,
    isPreviousData: false,    
    data: mockAlerts,
    refetch: async () => mockRefetchAlerts,
  };
