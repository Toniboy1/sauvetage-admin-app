import React, { ChangeEvent, useEffect, useState } from "react";
import Database from "../../../model/db";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IAction } from "../../actions/types";

/**
 * Represents a component that displays a list of actions and allows adding, editing, and deleting actions.
 * @returns The JSX element representing the Actions component.
 */
const ActionsComponent = () => {
  const [actions, setActions] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<IAction>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    loadActions();
  }, []);

  /**
   * Loads all actions from the database and updates the state with the retrieved data.
   */
  const loadActions = async () => {
    const allActions = await Database.getInstance().getAllActions();
    setActions(allActions);
  };

  /**
   * Adds a new action to the database and reloads the list of actions.
   */
  const handleAddAction = async () => {
    await Database.getInstance().addAction("New Action");
    loadActions();
  };

  /**
   * Deletes a action with the specified ID.
   * @param id - The ID of the action to delete.
   * @returns - A promise that resolves when the action is deleted.
   */
  const handleDeleteAction = async (id: number): Promise<void> => {
    await Database.getInstance().deleteAction(id);
    loadActions();
  };

  /**
   * Handles the update of a action.
   * Updates the action's name in the database, reloads the actions list, and closes the form.
   */
  const handleUpdateAction = async () => {
    await Database.getInstance().updateAction(
      currentAction.id,
      currentAction.name,
    );
    loadActions();
    handleClose();
  };

  /**
   * Handles the click event when a action is clicked.
   * @param action - The action object that was clicked.
   */
  const handleClickOpen = (action: IAction) => {
    setCurrentAction(action);
    setOpen(true);
  };

  /**
   * Closes the component.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the change event for the name input field.
   * Updates the current action's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentAction({ ...currentAction, name: event.target.value });
  };

  return (
    <div>
      <h1>Actions</h1>
      <Button variant="contained" color="primary" onClick={handleAddAction}>
        Add New Action
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell>{action.id}</TableCell>
                <TableCell>{action.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(action)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteAction(action.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the action, please enter their new name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentAction.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAction} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionsComponent;
