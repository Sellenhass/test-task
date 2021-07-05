import { handleActions } from "redux-actions";
import { changeCurrency } from "./actions";

const initialState = { selectedCurrency: "USD" };
export default handleActions(
  {
    [changeCurrency]: (state, action) => ({
      ...state,
      selectedCurrency: action.payload,
    }),
  },
  initialState
);
