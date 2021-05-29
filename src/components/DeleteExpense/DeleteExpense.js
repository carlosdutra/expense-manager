import React, { useState } from "react";
import { Dialog, IconButton, TrashIcon } from "evergreen-ui";

const DeleteExpense = ({ id, onDelete }) => {
  const [isShown, setIsShown] = useState(false);
  
  return (
    <>
      <Dialog
        isShown={isShown}
        title="Dialog title"
        intent="danger"
        onConfirm={() => onDelete(id)}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Delete"
      >
        Are you sure you want to delete this item?
      </Dialog>
      <IconButton
        icon={TrashIcon}
        appearance="minimal"
        intent="danger"
        onClick={() => setIsShown(true)}
      />
    </>
  );
};

export default DeleteExpense;
