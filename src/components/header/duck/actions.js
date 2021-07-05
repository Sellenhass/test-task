import { createActions } from "redux-actions";

export const {
  header: { changeCurrency },
} = createActions({ HEADER: { CHANGE_CURRENCY: undefined } });
