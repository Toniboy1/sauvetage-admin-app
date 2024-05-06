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
import { IOtherMean } from "../../otherMeans/types";

/**
 * Represents a component that displays a list of othermean and allows adding, editing, and deleting othermean.
 * @returns The JSX element representing the OtherMean component.
 */
const OtherMeanComponent = () => {
  const [othermean, setOtherMean] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentOtherMean, setCurrentOtherMean] = useState<IOtherMean>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    loadOtherMean();
  }, []);

  /**
   * Loads all othermean from the database and updates the state with the retrieved data.
   */
  const loadOtherMean = async () => {
    const allOtherMean = await db.getAllOtherMeans();
    setOtherMean(allOtherMean);
  };

  /**
   * Adds a new othermean to the database and reloads the list of othermean.
   */
  const handleAddOtherMean = async () => {
    await db.addOtherMean("New OtherMean Mean");
    loadOtherMean();
  };

  /**
   * Deletes a othermean with the specified ID.
   * @param id - The ID of the othermean to delete.
   * @returns - A promise that resolves when the othermean is deleted.
   */
  const handleDeleteOtherMean = async (id: number): Promise<void> => {
    await db.deleteOtherMean(id);
    loadOtherMean();
  };

  /**
   * Handles the update of a othermean.
   * Updates the othermean's name in the database, reloads the othermean list, and closes the form.
   */
  const handleUpdateOtherMean = async () => {
    await db.updateOtherMean(currentOtherMean.id, currentOtherMean.name);
    loadOtherMean();
    handleClose();
  };

  /**
   * Handles the click event when a othermean is clicked.
   * @param othermean - The othermean object that was clicked.
   */
  const handleClickOpen = (othermean: IOtherMean) => {
    setCurrentOtherMean(othermean);
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
   * Updates the current othermean's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentOtherMean({ ...currentOtherMean, name: event.target.value });
  };

  return (
    <div>
      <h1>OtherMean</h1>
      <Button variant="contained" color="primary" onClick={handleAddOtherMean}>
        Add New OtherMean
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
            {othermean.map((othermean) => (
              <TableRow key={othermean.id}>
                <TableCell>{othermean.id}</TableCell>
                <TableCell>{othermean.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(othermean)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteOtherMean(othermean.id)}
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
        <DialogTitle id="form-dialog-title">Update OtherMean</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the othermean, please enter their new name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentOtherMean.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOtherMean} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OtherMeanComponent;
