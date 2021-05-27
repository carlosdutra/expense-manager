import React, { useState } from "react";
import {
  Pane,
  Dialog,
  TextInputField,
  Button,
  toaster,
  PlusIcon,
} from "evergreen-ui";
import TextCurrencyField from "ui/TextCurrencyField";
import { v4 as uuidv4 } from "uuid";
import { format } from 'date-fns';
import "./AddExpenseForm.css";
import currency from 'currency.js'

const AddExpenseForm = (props) => {
  // State
  const [isShown, setIsShown] = useState(false);

  const [expense, setExpense] = useState({
    expenseTitle: undefined,
    expenseValue: undefined,
    expenseDate: undefined,
  });

  // Handlers
  const handleTitleChange = (event) => {
    setExpense((prevState) => {
      return { ...prevState, expenseTitle: event.target.value };
    });
  };

  const handleValueChange = (event) => {
    setExpense((prevState) => {
      return { ...prevState, expenseValue: event.target.value };
    });
  };

  const handleDateChange = (event) => {
    setExpense((prevState) => {
      return { ...prevState, expenseDate: event.target.value };
    });
  };

  // Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Close Dialog
    setIsShown(false);

    // Notify user
    toaster.success("Your expense was added sucessfully.");

    // Send item to ExpenseList compontent
    const combinedData = {
      id: uuidv4(),
      title: expense.expenseTitle,
      value: currency(expense.expenseValue),
      // date: new Date(expense.expenseDate + " 00:00:00").toDateString(),
      date: new Date(expense.expenseDate.replace(/-/g, '\/')).toISOString(),
    };

    props.onSubmitExpense(combinedData);

    // Clear form
    setExpense({
      expenseTitle: undefined,
      expenseValue: undefined,
      expenseDate: undefined,
    });
  };

  return (
    <Pane className="my-4">
      <Dialog
        isShown={isShown}
        title="Add a new expense"
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        <Pane>
          <form className="form__wrap p-3" onSubmit={handleSubmit}>
            <Pane className="form__controls">
              <Pane className="form__control">
                <TextInputField
                  label="What is the name of the expense?"
                  description="Please provide a short title for your expense"
                  placeholder="E.g. car insurance, phone bill..."
                  value={expense.expenseTitle}
                  onChange={handleTitleChange}
                  required
                  // validationMessage="This field is required"
                />
              </Pane>
              <Pane className="form__control" marginBottom={24}>
                <Pane marginBottom={8}>
                  <label className="datepicker__label">
                    How much was your expense? *
                  </label>
                  <p className="datepicker__description">
                    Please provide the value of the expense
                  </p>
                </Pane>
                <TextCurrencyField
                  className="datepicker__input"
                  placeholder="CA$0.00"
                  value={expense.expenseValue}
                  onChange={handleValueChange}
                  required
                  // validationMessage="This field is required"
                />
              </Pane>
              <Pane className="form__control" marginBottom={24}>
                <Pane marginBottom={8}>
                  <label className="datepicker__label">
                    When did it happen? *
                  </label>
                  <p className="datepicker__description">
                    Please provide a date for your expense
                  </p>
                </Pane>
                <input
                  type="date"
                  className="datepicker__input"
                  max={format(new Date(), 'yyyy-MM-dd')}
                  value={expense.expenseDate}
                  onChange={handleDateChange}
                  required
                />
              </Pane>
            </Pane>

            <Pane className="form__submit">
              <Button type="submit" intent="success" marginRight={8}>
                Save
              </Button>
              <Button intent="danger" onClick={() => setIsShown(false)}>
                Cancel
              </Button>
            </Pane>
          </form>
        </Pane>
      </Dialog>

      <Button iconAfter={PlusIcon} onClick={() => setIsShown(true)}>
        Add a new expense
      </Button>
    </Pane>
  );
};

export default AddExpenseForm;
