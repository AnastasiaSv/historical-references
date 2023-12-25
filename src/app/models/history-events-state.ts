import { IHistoryEvent } from "./history-event";

export interface IHistoryEventsState {
  isLoading: boolean;
  value?: IHistoryEvent[];
}
