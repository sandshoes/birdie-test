export type Event = {
  id: number;
  event_id: string;
  alert_id?: string;
  task_instance_id?: string;
  event_type: string;
  visit_id?: string;
  caregiver_id?: string;
  care_recipient_id: string;
  timestamp: string;
  payload: Record<string, string>;
  caregivers?: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

export type Alert = {
  caregiver: string;
  matched: boolean;
  alert: Event;
};
