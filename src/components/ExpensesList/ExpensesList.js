import React, { useState } from "react";
import AddExpenseForm from "components/AddExpenseForm";
import ExpenseItem from "components/ExpenseItem";
import ExpensesBarView from "components/ExpensesBarView";
import { Pane, Heading, Paragraph, InfoSignIcon, Strong } from "evergreen-ui";
import {
  format,
  compareAsc,
  isThisYear,
  isThisMonth,
  isThisWeek,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import currency from "currency.js";
import _ from "lodash";

const ExpensesList = () => {
  // Get Local Storage
  let existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

  // State
  const [expenses, setExpenses] = useState(existingEntries);

  // Currency
  const CUR = (value) => currency(value, { symbol: "CA$" });

  // Save expense item to state
  const saveExpenses = (expense) => {
    setExpenses([...expenses, expense]);
    existingEntries.push(expense);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  const deleteExpense = (id) => {
    const filteredArray = expenses.filter((e) => e.id !== id)
    setExpenses(filteredArray);
    localStorage.setItem("allEntries", JSON.stringify(filteredArray));
  }

  // Group Expenses by periods
  // let groupExpensesByYear = _.groupBy(expenses, (result) => format(new Date(result.date), 'yyyy'))
  // let groupExpensesByMonthSortByDate = _.sortBy(groupExpensesByMonth, (result) => format(new Date(result.date), 'yyyy_M'));
  // let groupExpensesByWeek = _.groupBy(expenses, (result) => format(new Date(result.date), 'yyyy_M_w'))

  // Feed Overview Monthly Chart of Current Year
  let groupExpensesByMonthOfCurrentYear = _.groupBy(
    expenses.filter((e) => isThisYear(new Date(e.date))),
    (result) => format(new Date(result.date), "M")
  );
  const expenseTotalByMonthOfCurrentYear = Object.keys(groupExpensesByMonthOfCurrentYear).map((k) => {
    return groupExpensesByMonthOfCurrentYear[k]
      .map((r) => parseFloat(r.value))
      .reduce((acc, cur) => acc + cur, 0);
  });
  const monthsIndexes = Object.keys(groupExpensesByMonthOfCurrentYear).map(n => parseInt(n));

  console.log(expenseTotalByMonthOfCurrentYear, monthsIndexes);

  // Sum Expenses by current year, month, week and day
  const getYearTotal = () =>
    CUR(
      expenses
        .filter((e) => isThisYear(new Date(e.date)))
        .reduce((a, b) => a + (currency(b["value"]).value || 0), 0)
    ).format();

  const getMonthTotal = () =>
    CUR(
      expenses
        .filter((e) => isThisMonth(new Date(e.date)))
        .reduce((a, b) => a + (currency(b["value"]).value || 0), 0)
    ).format();

  const getWeekTotal = () =>
    CUR(
      expenses
        .filter((e) => isThisWeek(new Date(e.date)))
        .reduce((a, b) => a + (currency(b["value"]).value || 0), 0)
    ).format();

  const getTodaysTotal = () =>
    CUR(
      expenses
        .filter((e) => isToday(new Date(e.date)))
        .reduce((a, b) => a + (currency(b["value"]).value || 0), 0)
    ).format();

  return (
    <Pane className="main px-4">
      <Pane className="container mx-auto">
        <Pane className="flex mb-6 gap-6">
          <Pane className="w-auto">

            <Pane className="mb-3">
              <Strong>Total Expenses</Strong>
              <Paragraph size={300}>
                This is how much you have spent this year
              </Paragraph>
              <Heading size={900}>{getYearTotal()}</Heading>
            </Pane>

            <Pane className="mb-3">
              <Strong>{format(new Date(), "MMM yyyy")}</Strong>
              <Paragraph size={300}>Your total for this month</Paragraph>
              <Heading size={800}>{getMonthTotal()}</Heading>
            </Pane>

            <Pane className="mb-3">
              <Strong>
                {format(startOfWeek(new Date()), "MMM do")} -{" "}
                {format(endOfWeek(new Date()), "MMM do")}
              </Strong>
              <Paragraph size={300}>Your total for this week</Paragraph>
              <Heading size={800}>{getWeekTotal()}</Heading>
            </Pane>

            <Pane className="mb-3">
              <Strong>{format(new Date(), "EEEE, MMM do yyyy")}</Strong>
              <Paragraph size={300}>Your total today</Paragraph>
              <Heading size={800}>{getTodaysTotal()}</Heading>
            </Pane>
          </Pane>

          <Pane className="w-full">
            <ExpensesBarView data={expenseTotalByMonthOfCurrentYear} months={monthsIndexes} />
          </Pane>

        </Pane>

        <AddExpenseForm onSubmitExpense={saveExpenses} />

        <Heading size={600}>Your expenses ({expenses.length})</Heading>
        {expenses.length > 0 ? (
          expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((expense) => (
              <ExpenseItem
                key={expense.id}
                id={expense.id}
                title={expense.title}
                value={CUR(expense.value).format()}
                date={new Date(expense.date).toDateString()}
                onDelete={deleteExpense}
                // date={format(new Date(expense.date), 'MMM do yyyy')}
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
