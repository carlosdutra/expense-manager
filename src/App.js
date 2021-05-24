import "./App.css";
import TopMenu from "components/TopMenu";
import ExpensesOverview from "components/ExpensesOverview";
import ExpensesList from "components/ExpensesList";
import SideNav from "components/SideNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App grid-container">
        <TopMenu />
        <SideNav />
        <Switch>
          <Route path="/" exact component={ExpensesList} />
          <Route path="/reports" component={ExpensesOverview} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
