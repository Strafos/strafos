import { combineReducers } from "redux";

import notePage from "./screens/NotePage/notePageReducer";
import dashboardPage from "./screens/dashboardPage/dashboardPageReducer";
import commonData from "./commonReducers";

export default combineReducers({
  notePage,
  // commonData,
});
