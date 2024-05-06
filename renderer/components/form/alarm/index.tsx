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
import { IAlarm } from "../../alarm/types";

/**
 * Represents a component that displays a list of alarm and allows adding, editing, and deleting alarm.
 * @returns The JSX element representing the Alarm component.
 */
const AlarmComponent = () => {
  const [alarm, setAlarm] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAlarm, setCurrentAlarm] = useState<IAlarm>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    loadAlarm();
  }, []);

  /**
   * Loads all alarm from the database and updates the state with the retrieved data.
   */
  const loadAlarm = async () => {
    const allAlarm = await db.getAllAlarms();
    setAlarm(allAlarm);
  };

  /**
   * Adds a new alarm to the database and reloads the list of alarm.
   */
  const handleAddAlarm = async () => {
    await db.addAlarm("New Alarm Mean");
    loadAlarm();
  };

  /**
   * Deletes a alarm with the specified ID.
   * @param id - The ID of the alarm to delete.
   * @returns - A promise that resolves when the alarm is deleted.
   */
  const handleDeleteAlarm = async (id: number): Promise<void> => {
    await db.deleteAlarm(id);
    loadAlarm();
  };

  /**
   * Handles the update of a alarm.
   * Updates the alarm's name in the database, reloads the alarm list, and closes the form.
   */
  const handleUpdateAlarm = async () => {
    await db.updateAlarm(currentAlarm.id, currentAlarm.name);
    loadAlarm();
    handleClose();
  };

  /**
   * Handles the click event when a alarm is clicked.
   * @param alarm - The alarm object that was clicked.
   */
  const handleClickOpen = (alarm: IAlarm) => {
    setCurrentAlarm(alarm);
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
   * Updates the current alarm's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentAlarm({ ...currentAlarm, name: event.target.value });
  };

  return (
    <div>
      <h1>Alarm</h1>
      <Button variant="contained" color="primary" onClick={handleAddAlarm}>
        Add New Alarm
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
            {alarm.map((alarm) => (
              <TableRow key={alarm.id}>
                <TableCell>{alarm.id}</TableCell>
                <TableCell>{alarm.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(alarm)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteAlarm(alarm.id)}
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
        <DialogTitle id="form-dialog-title">Update Alarm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the alarm, please enter their new name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentAlarm.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAlarm} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlarmComponent;
