import { handleActions } from "redux-actions";
import { changeCategory } from "./actions";

const initialState = { categoryName: "clothes" };
export default handleActions(
  {
    [changeCategory]: (state, action) => ({
      ...state,
      categoryName: action.payload,
    }),
  },
  initialState
);
