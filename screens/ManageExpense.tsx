import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { ExpenseItemTypes } from "../components/ExpensesOutput/ExpenseItem";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context/expenses-context";

type ExpenseDataTypes = {
  description: string;
  amount: string;
  date: Date;
};

const ManageExpense = ({ route, navigation }: any) => {
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  // this is a boolean, if it exists it'll be true, else false

  const selectedExpense = expenseCtx.expenses.find(
    (expense: ExpenseItemTypes) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Create Expense",
    });
  }, [navigation, isEditing]);
  //   basically, if the value of isEditing changes, it'll change the title.
  //   remember with useLayoutEffect, the data will change while the page is being rendered.
  //   Unlike UseEffect that waits till after.

  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const confirmHandler = (expenseData: any) => {
    isEditing
      ? expenseCtx.updateExpense(editedExpenseId, expenseData)
      : expenseCtx.addExpense(expenseData);
    navigation.goBack();
  };
  // const confirmHandler = (expenseData: any) => {
  //   isEditing
  //     ? expenseCtx.updateExpense(editedExpenseId,
  //       {
  //         description: "Test!!!",
  //         amount: 18.99,
  //         date: new Date("2022-05-19"),
  //       }
  //       )
  //     : expenseCtx.addExpense({
  //         description: "Test",
  //         amount: 18.99,
  //         date: new Date("2022-05-19"),
  //       });
  //   navigation.goBack();
  // };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
