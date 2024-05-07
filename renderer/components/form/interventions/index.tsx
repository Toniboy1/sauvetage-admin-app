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
import { IInterventionType } from "../../interventions/types";

/**
 * Represents a component that displays a list of intervention and allows adding, editing, and deleting intervention.
 * @returns The JSX element representing the Intervention component.
 */
const InterventionComponent = () => {
  const [intervention, setIntervention] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState<IInterventionType>(
    {
      id: 0,
      name: "",
    },
  );

  useEffect(() => {
    loadIntervention();
  }, []);

  /**
   * Loads all intervention from the database and updates the state with the retrieved data.
   */
  const loadIntervention = async () => {
    const allIntervention = await db.getAllInterventions();
    setIntervention(allIntervention);
  };

  /**
   * Adds a new intervention to the database and reloads the list of intervention.
   */
  const handleAddIntervention = async () => {
    await db.addIntervention("New Intervention Mean");
    loadIntervention();
  };

  /**
   * Deletes a intervention with the specified ID.
   * @param id - The ID of the intervention to delete.
   * @returns - A promise that resolves when the intervention is deleted.
   */
  const handleDeleteIntervention = async (id: number): Promise<void> => {
    await db.deleteIntervention(id);
    loadIntervention();
  };

  /**
   * Handles the update of a intervention.
   * Updates the intervention's name in the database, reloads the intervention list, and closes the form.
   */
  const handleUpdateIntervention = async () => {
    await db.updateIntervention(
      currentIntervention.id,
      currentIntervention.name,
    );
    loadIntervention();
    handleClose();
  };

  /**
   * Handles the click event when a intervention is clicked.
   * @param intervention - The intervention object that was clicked.
   */
  const handleClickOpen = (intervention: IInterventionType) => {
    setCurrentIntervention(intervention);
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
   * Updates the current intervention's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentIntervention({
      ...currentIntervention,
      name: event.target.value,
    });
  };

  return (
    <div>
      <h1>Intervention</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddIntervention}
      >
        Add New Intervention
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
            {intervention.map((intervention) => (
              <TableRow key={intervention.id}>
                <TableCell>{intervention.id}</TableCell>
                <TableCell>{intervention.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(intervention)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteIntervention(intervention.id)}
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
        <DialogTitle id="form-dialog-title">Update Intervention</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the intervention, please enter their new name
            here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentIntervention.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateIntervention} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InterventionComponent;
