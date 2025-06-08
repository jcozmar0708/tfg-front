import { combineReducers } from "redux";
import { authReducer } from "../services/redux/auth/reducer";
import { usersReducer } from "../services/redux/users/reducer";
import { groupsReducer } from "../services/redux/groups/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  groups: groupsReducer,
});

export default rootReducer;
