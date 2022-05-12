import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

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

export interface ExpensesState {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

const initialState: ExpensesState[] = DUMMY_EXPENSES;

// lmao this is a lot easier than using the Context API, and one reason is Immer.

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (
      state: ExpensesState[],
      action: PayloadAction<ExpensesState>
    ) => {
      const index = new Date().toString() + Math.random().toString();
      state.push({ ...action.payload, id: index });
    },
    deleteExpense: (state: ExpensesState[], action: PayloadAction<string>) => {
      state.filter((expense: ExpensesState) => expense.id !== action.payload);
    },
    updateExpense: (
      state: ExpensesState[],
      action: PayloadAction<ExpensesState>
    ) => {
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpensesState) => expense.id === action.payload.id
      );
      //   gets the array index (in the state array) of the expense having that Id
      const updatableExpense = state[updatableExpenseIndex];
      //   uses this index to get the actual expense
      //   the whole process is sort of like findById
      const updatedItem = { ...updatableExpense, ...action.payload };
      //   use this to create a new item that combines the existing expense item with the new payload
      state[updatableExpenseIndex] = updatedItem;
      //   replaces the old expense with the new one
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export const selectAllExpenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
