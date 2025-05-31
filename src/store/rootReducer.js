import { combineReducers } from "redux";
import { authReducer } from "../services/redux/auth/reducer";
import { usersReducer } from "../services/redux/users/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
