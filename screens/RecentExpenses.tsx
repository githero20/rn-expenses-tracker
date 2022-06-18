import { useContext, useState } from "react";

import { useEffect } from "react";
import { ExpenseItemTypes } from "../components/ExpensesOutput/ExpenseItem";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/context/expenses-context";
import {
  ExpensesState,
  selectAllExpenses,
  setExpenses,
} from "../store/redux/expensesSlice";
// import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState<null | string>(null);

  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  // // With Redux
  // const allExpenses = useAppSelector(selectAllExpenses);
  // // this gets all our existing expenses
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchExpenses();
    // useEffect hook should return nothing or a clean up function
    //  but passing an async function directly into it will cause it to do return an AsyncFunction object using a Promise
    // this is a workaround
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        // dispatch(setExpenses(expenses));
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setIsError("Could not fetch expenses.");
      }
      setIsFetching(false);
    };

    getExpenses();
  }, []);

  // instead of doing all these, we could just use react-query or rtk query for fetching states.

  if (isFetching) return <LoadingOverlay />;

  if (isError && !isFetching)
    return (
      <ErrorOverlay
        message="Could not fetch expenses."
        // onConfirm={errorHandler}
        // same as: onConfirm={() => errorHandler()}
      />
    );

  // With Redux
  // const recentExpenses = allExpenses.filter((expense: ExpensesState) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);

  //   return expense.date >= date7DaysAgo && expense.date <= today;
  // });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses found from the past 7 days."
    />
  );
};

export default RecentExpenses;
