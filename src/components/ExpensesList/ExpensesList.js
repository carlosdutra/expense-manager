import React, { useState } from "react";
import AddExpenseForm from "components/AddExpenseForm";
import ExpenseItem from "components/ExpenseItem";
import { Pane, Heading, Paragraph, InfoSignIcon, Strong } from "evergreen-ui";

const ExpensesList = () => {
  // State
  const [expenses, setExpenses] = useState([]);
  // const expensesInLocalStorage = [...expenses];
  let existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

  // Save expense item to state
  const saveExpenses = (expense) => {
    setExpenses([...expenses, expense]);

    existingEntries.push(expense);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  return (
    <Pane className="main px-4">
      <Pane className="container mx-auto">
        <Pane>
          <Strong>Total Expenses</Strong>
          <Heading size={900}>
            CA$
            {existingEntries.length > 0
              ? existingEntries.reduce((a, b) => a + b["value"], 0)
              : "0"}
          </Heading>
        </Pane>

        <AddExpenseForm onSubmitExpense={saveExpenses} />
        <Heading size={600}>
          Your expenses ({existingEntries.length})
        </Heading>
        {existingEntries.length > 0 ? (
          existingEntries
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((expense, i) => (
              <ExpenseItem
                key={i}
                title={expense.title}
                value={expense.value}
                date={expense.date}
              />
            ))
        ) : (
          <Pane className="p-10 my-4 text-center" background="#f8f8f8">
            <Paragraph color="#C8C8C8">
              <InfoSignIcon size={12} /> You don't have any expenses yet.
            </Paragraph>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};
export default ExpensesList;
