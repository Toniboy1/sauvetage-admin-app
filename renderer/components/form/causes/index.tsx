import React, { ChangeEvent, useEffect, useState } from "react";
import db from "../../../model/db";
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
import { ICause } from "../../causes/types";

/**
 * Represents a component that displays a list of causes and allows adding, editing, and deleting causes.
 * @returns The JSX element representing the Causes component.
 */
const CausesComponent = () => {
  const [causes, setCauses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCause, setCurrentCause] = useState<ICause>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    loadCauses();
  }, []);

  /**
   * Loads all causes from the database and updates the state with the retrieved data.
   */
  const loadCauses = async () => {
    const allCauses = await db.getAllCauses();
    setCauses(allCauses);
  };

  /**
   * Adds a new cause to the database and reloads the list of causes.
   */
  const handleAddCause = async () => {
    await db.addCause("New Cause");
    loadCauses();
  };

  /**
   * Deletes a cause with the specified ID.
   * @param id - The ID of the cause to delete.
   * @returns - A promise that resolves when the cause is deleted.
   */
  const handleDeleteCause = async (id: number): Promise<void> => {
    await db.deleteCause(id);
    loadCauses();
  };

  /**
   * Handles the update of a cause.
   * Updates the cause's name in the database, reloads the causes list, and closes the form.
   */
  const handleUpdateCause = async () => {
    await db.updateCause(currentCause.id, currentCause.name);
    loadCauses();
    handleClose();
  };

  /**
   * Handles the click event when a cause is clicked.
   * @param cause - The cause object that was clicked.
   */
  const handleClickOpen = (cause: ICause) => {
    setCurrentCause(cause);
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
   * Updates the current cause's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentCause({ ...currentCause, name: event.target.value });
  };

  return (
    <div>
      <h1>Causes</h1>
      <Button variant="contained" color="primary" onClick={handleAddCause}>
        Add New Cause
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
            {causes.map((cause) => (
              <TableRow key={cause.id}>
                <TableCell>{cause.id}</TableCell>
                <TableCell>{cause.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(cause)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteCause(cause.id)}
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
        <DialogTitle id="form-dialog-title">Update Cause</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the cause, please enter their new name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentCause.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCause} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CausesComponent;
