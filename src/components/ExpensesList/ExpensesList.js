import React, { useState } from "react";
import AddExpenseForm from "components/AddExpenseForm";
import ExpenseItem from "components/ExpenseItem";
import { Pane, Heading, Paragraph, InfoSignIcon, Strong } from "evergreen-ui";
import {
  format,
  compareAsc,
  isThisMonth,
  isToday,
  isThisWeek,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import currency from "currency.js";

const ExpensesList = () => {
  // Get Local Storage
  let existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

  // State
  const [expenses, setExpenses] = useState([]);

  // Save expense item to state
  const saveExpenses = (expense) => {
    setExpenses([...expenses, expense]);

    existingEntries.push(expense);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  const getAllExpensesTotal = () => {
    return existingEntries.length > 0
      ? existingEntries.reduce(
          (a, b) => a + (currency(b["value"]).value || 0),
          0
        )
      : "0";
  };

  const getMonthTotal = () =>
    existingEntries
      .filter((e) => isThisMonth(new Date(e.date)))
      .reduce((a, b) => a + (currency(b["value"]).value || 0), 0);

  const getWeekTotal = () =>
    existingEntries
      .filter((e) => isThisWeek(new Date(e.date)))
      .reduce((a, b) => a + (currency(b["value"]).value || 0), 0);

  const getTodaysTotal = () =>
    existingEntries
      .filter((e) => isToday(new Date(e.date)))
      .reduce((a, b) => a + (currency(b["value"]).value || 0), 0);

  return (
    <Pane className="main px-4">
      <Pane className="container mx-auto">

        <Pane className="flex mb-3">
          <Pane>
            <Strong>Total Expenses</Strong>
            <Paragraph size={300}>
              This is how much you have spent so far
            </Paragraph>
            <Heading size={900}>CA${getAllExpensesTotal()}</Heading>
          </Pane>
          <Pane>Chart will go here</Pane>
        </Pane>

        <Pane className="flex gap-16">
          <Pane className="mb-3">
            <Strong>{format(new Date(), "MMM yyyy")}</Strong>
            <Paragraph size={300}>Your total for this month</Paragraph>
            <Heading size={900}>CA${getMonthTotal()}</Heading>
          </Pane>

          <Pane className="mb-3">
            <Strong>
              {format(startOfWeek(new Date()), "MMM do")} -{" "}
              {format(endOfWeek(new Date()), "MMM do")}
            </Strong>
            <Paragraph size={300}>Your total for this week</Paragraph>
            <Heading size={900}>CA${getWeekTotal()}</Heading>
          </Pane>

          <Pane className="mb-3">
            <Strong>{format(new Date(), "EEEE, MMM do yyyy")}</Strong>
            <Paragraph size={300}>Your total today</Paragraph>
            <Heading size={900}>CA${getTodaysTotal()}</Heading>
          </Pane>
        </Pane>

        <AddExpenseForm onSubmitExpense={saveExpenses} />

        <Heading size={600}>Your expenses ({existingEntries.length})</Heading>
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
