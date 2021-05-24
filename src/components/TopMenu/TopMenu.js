import { Avatar, Heading, Pane } from "evergreen-ui";

const TopMenu = () => {
  return (
    <Pane className="header px-4 py-2" background="#5f9578" marginBottom={32}>
      <Pane className="container mx-auto flex items-center justify-between">
        <Pane>
          <Heading color="white">ExpTracker</Heading>
        </Pane>
        <Pane>
          {/* <Avatar
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            name="Icon Placeholder"
            size={40}
          ></Avatar> */}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default TopMenu;
