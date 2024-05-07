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
import { ISeverity } from "../../severities/types";

/**
 * Represents a component that displays a list of severity and allows adding, editing, and deleting severity.
 * @returns The JSX element representing the Severity component.
 */
const SeverityComponent = () => {
  const [severity, setSeverity] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSeverity, setCurrentSeverity] = useState<ISeverity>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    loadSeverity();
  }, []);

  /**
   * Loads all severity from the database and updates the state with the retrieved data.
   */
  const loadSeverity = async () => {
    const allSeverity = await db.getAllSeverities();
    setSeverity(allSeverity);
  };

  /**
   * Adds a new severity to the database and reloads the list of severity.
   */
  const handleAddSeverity = async () => {
    await db.addSeverity("New Severity Mean");
    loadSeverity();
  };

  /**
   * Deletes a severity with the specified ID.
   * @param id - The ID of the severity to delete.
   * @returns - A promise that resolves when the severity is deleted.
   */
  const handleDeleteSeverity = async (id: number): Promise<void> => {
    await db.deleteSeverity(id);
    loadSeverity();
  };

  /**
   * Handles the update of a severity.
   * Updates the severity's name in the database, reloads the severity list, and closes the form.
   */
  const handleUpdateSeverity = async () => {
    await db.updateSeverity(currentSeverity.id, currentSeverity.name);
    loadSeverity();
    handleClose();
  };

  /**
   * Handles the click event when a severity is clicked.
   * @param severity - The severity object that was clicked.
   */
  const handleClickOpen = (severity: ISeverity) => {
    setCurrentSeverity(severity);
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
   * Updates the current severity's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentSeverity({ ...currentSeverity, name: event.target.value });
  };

  return (
    <div>
      <h1>Severity</h1>
      <Button variant="contained" color="primary" onClick={handleAddSeverity}>
        Add New Severity
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
            {severity.map((severity) => (
              <TableRow key={severity.id}>
                <TableCell>{severity.id}</TableCell>
                <TableCell>{severity.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(severity)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteSeverity(severity.id)}
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
        <DialogTitle id="form-dialog-title">Update Severity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the severity, please enter their new name
            here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentSeverity.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSeverity} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SeverityComponent;
