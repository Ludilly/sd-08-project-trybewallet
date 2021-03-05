// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import * as walletAction from '../actions/wallet';

const initialStateWallet = {
  currencies: [],
  expenses: [],
  loading: false,
};

const wallet = (state = initialStateWallet, action) => {
  switch (action.type) {
  case walletAction.REQUEST_TO_API:
    return { ...state, loading: true };

  case walletAction.REQUEST_FAIL:
    return { ...state, loading: false, error: action.error };

  case walletAction.REQUEST_SUCESS:
    return {
      ...state,
      loading: false,
      currencies: [...Object.keys(action.currencies)
        .filter((noUSTD) => noUSTD !== 'USDT')],
    };

  case walletAction.ADD_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };

  case walletAction.DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.expense.id),
      ],
      editing: false,
    };
  case walletAction.INIT_EDIT_EXPENSE:
    return {
      ...state,
      editing: true,
      expenseId: action.expense.id,
    };
  case walletAction.FINISH_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) return { ...item, ...action.expense };
        return item;
      }),
      isEditing: false,
    };

  default:
    return initialStateWallet;
  }
};

export default wallet;
