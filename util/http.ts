import axios from "axios";
import { ExpenseItemTypes } from "../components/ExpensesOutput/ExpenseItem";

const backendUrl: string | undefined =
  process.env.REACT_APP_BACKEND_URL ||
  "https://rn-expense-tracker-d97fb-default-rtdb.firebaseio.com";
// firebase requires that you always store your files in json format, hence the addition of .json

export const storeExpense = async (
  expenseData: ExpenseItemTypes
): Promise<string> => {
  const res = await axios.post(backendUrl + "/expenses.json", expenseData);
  const expenseId = res.data.name;
  return expenseId;
};

export const fetchExpenses = async (): Promise<ExpenseItemTypes[]> => {
  const res = await axios.get(backendUrl + "/expenses.json");

  const expenses: ExpenseItemTypes[] = [];
  console.log(expenses);

  for (const key in res.data) {
    // key: the unique ID/name for every object in the firebase db
    const expenseObj: ExpenseItemTypes = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

const getExpenses = async () => {
  try {
    const expenses = await fetchExpenses();
    // dispatch(setExpenses(expenses));
  } catch (error) {
    console.log("Error");
  }
};

getExpenses();

export const updateExpenseAx = (id: string, expenseData: ExpenseItemTypes) => {
  return axios.put(backendUrl + `/expenses/${id}.json`, expenseData);
};

export const deleteExpenseAx = (id: string) => {
  return axios.delete(backendUrl + `/expenses/${id}.json`);
};
