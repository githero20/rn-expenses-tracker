import { createContext, useReducer } from "react";

// Also do this in Redux, Omogbai

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

type ExpenseDataProps = {
  description: string;
  amount: number;
  date: Date;
};

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }: ExpenseDataProps) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: ExpenseDataProps
  ) => {},
});

const expensesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      const index = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: index }, ...state];
    // adds the new expense and id to the existing state
    // this doesn't use immer, so you need to spread the state first
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: any) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      // we use the index in the array to get the old, actual expense
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // we create an updatedItem with the old expense and the new data
      const updatedExpenses = [...state];
      // we use this to get the new array complete with our updated expenses
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      // we replace the updatableExpense with this new one
      return updatedExpenses;
    // see all the stress we're going through just to update an array, Redux (immer) >>>
    case "DELETE":
      return state.filter((expense: any) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }: any) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpenseFn = (expenseData: ExpenseDataProps) => {
    dispatch({ type: "ADD", payload: expenseData });
    // dispatching the action to the reducer above
    // the reducer sorts it based on type and executes the correct response.
    // very similar to our redux, but if you're using a slice reember that the redux slice combines all these
  };
  const deleteExpenseFn = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpenseFn = (id: string, expenseData: ExpenseDataProps) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const providerValue = {
    expenses: expensesState,
    addExpense: addExpenseFn,
    deleteExpense: deleteExpenseFn,
    updateExpense: updateExpenseFn,
  };
  return (
    <ExpensesContext.Provider value={providerValue}>
      {children}
    </ExpensesContext.Provider>
  );
};
