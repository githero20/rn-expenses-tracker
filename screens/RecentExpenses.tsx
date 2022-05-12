import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
// import { ExpensesContext } from "../store/context/expenses-context";
import { ExpensesState, selectAllExpenses } from "../store/redux/expensesSlice";
import { useAppSelector } from "../store/redux/hooks";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  // const expensesCtx = useContext(ExpensesContext);

  // const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);

  //   return expense.date >= date7DaysAgo && expense.date <= today;
  // });

  // With Redux
  const allExpenses = useAppSelector(selectAllExpenses);
  // this gets all our existing expenses

  const recentExpenses = allExpenses.filter((expense: ExpensesState) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
};

export default RecentExpenses;
