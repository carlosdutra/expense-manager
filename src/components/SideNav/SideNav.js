import { Button, Pane, ManualIcon } from "evergreen-ui";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <Pane className="sidenav flex flex-col">
      <Link to="/">
          <Button appearance="minimal">Dashboard</Button>
      </Link>
      <Link to="/reports">
          <Button iconBefore={ManualIcon} appearance="minimal">Reports</Button>
      </Link>
    </Pane>
  );
};

export default SideNav;
