import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
// import { selectAllExpenses } from "../store/redux/expensesSlice";
// import { useAppSelector } from "../store/redux/hooks";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  // const allExpenses = useAppSelector(selectAllExpenses);

  return (
    // <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
    <ExpensesOutput
      // expenses={allExpenses}
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found."
    />
  );
}

export default AllExpenses;
