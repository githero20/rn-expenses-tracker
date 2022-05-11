import { useLayoutEffect } from "react";
import { Text } from "react-native";

const ManageExpense = ({ route, navigation }: any) => {
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;
  // this is a boolean, if it exists it'll be true, else false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Create Expense",
    });
  }, [navigation, isEditing]);
  //   basically, if the value of isEditing changes, it'll change the title.
  // remember with useLayoutEffect, the data will change while the page is being rendered.
  //   Unlike UseEffect that waits till after.

  return <Text>Manage Expense</Text>;
};

export default ManageExpense;
