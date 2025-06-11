import * as Type from "./types";

const initialState = {
  response: null,
  loading: false,
  error: null,
  type: null,
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CLEAR_EXPENSES_RESPONSE:
      return { ...state, response: null };

    case Type.CLEAR_EXPENSES_ERROR:
      return { ...state, error: null };

    case Type.GET_USER_DEBTS_REQUEST:
      return { ...state, loading: true, error: null, type: "debts" };

    case Type.POST_CREATE_EXPENSE_REQUEST:
      return { ...state, loading: true, error: null, type: "createExpense" };

    case Type.POST_PAY_IN_CASH_REQUEST:
      return { ...state, loading: true, error: null };

    case Type.GET_USER_DEBTS_SUCCESS:
    case Type.POST_CREATE_EXPENSE_SUCCESS:
    case Type.POST_PAY_IN_CASH_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case Type.GET_USER_DEBTS_FAILURE:
    case Type.POST_CREATE_EXPENSE_FAILURE:
    case Type.POST_PAY_IN_CASH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
