import {
  Heading,
  Pane,
  EditIcon,
  TrashIcon,
  Strong,
  Badge,
  IconButton,
} from "evergreen-ui";

const ExpenseItem = ({ title, value, date }) => {
  return (
    <Pane className="my-2" elevation={1} padding={20}>
      <Pane>
        <Badge color="green">CATEGORY</Badge>
      </Pane>

      <Pane className="flex justify-between items-center">
        <Pane className="flex items-center w-1/2 gap-x-6">
          <Strong size={300}>{date}</Strong>
          <Strong>CA${value}</Strong>
          <Heading size={700}>{title}</Heading>
        </Pane>

        <Pane className="w-1/2 text-right">
          <IconButton
            icon={EditIcon}
            appearance="minimal"
            onClick={() => alert("Edit item")}
          />
          <IconButton
            icon={TrashIcon}
            appearance="minimal"
            intent="danger"
            onClick={() => alert("Delete item")}
          />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default ExpenseItem;
