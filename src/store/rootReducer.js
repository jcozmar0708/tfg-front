import { combineReducers } from "redux";
import { authReducer } from "../services/redux/auth/reducer";
import { usersReducer } from "../services/redux/users/reducer";
import { groupsReducer } from "../services/redux/groups/reducer";
import { expensesReducer } from "../services/redux/expenses/reducer";
import { paymentsReducer } from "../services/redux/payments/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  groups: groupsReducer,
  expenses: expensesReducer,
  payments: paymentsReducer,
});

export default rootReducer;
