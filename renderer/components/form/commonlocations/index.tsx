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
import { ICommonLocation } from "../../location/types";

/**
 * Represents a component that displays a list of commonlocations and allows adding, editing, and deleting commonlocations.
 * @returns The JSX element representing the CommonLocations component.
 */
const CommonLocationsComponent = () => {
  const [commonlocations, setCommonLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCommonLocation, setCurrentCommonLocation] =
    useState<ICommonLocation>({
      id: 0,
      name: "",
    });

  useEffect(() => {
    loadCommonLocations();
  }, []);

  /**
   * Loads all commonlocations from the database and updates the state with the retrieved data.
   */
  const loadCommonLocations = async () => {
    const allCommonLocations = await db.getAllCommonLocations();
    setCommonLocations(allCommonLocations);
  };

  /**
   * Adds a new commonlocation to the database and reloads the list of commonlocations.
   */
  const handleAddCommonLocation = async () => {
    await db.addCommonLocation("New CommonLocation");
    loadCommonLocations();
  };

  /**
   * Deletes a commonlocation with the specified ID.
   * @param id - The ID of the commonlocation to delete.
   * @returns - A promise that resolves when the commonlocation is deleted.
   */
  const handleDeleteCommonLocation = async (id: number): Promise<void> => {
    await db.deleteCommonLocation(id);
    loadCommonLocations();
  };

  /**
   * Handles the update of a commonlocation.
   * Updates the commonlocation's name in the database, reloads the commonlocations list, and closes the form.
   */
  const handleUpdateCommonLocation = async () => {
    await db.updateCommonLocation(
      currentCommonLocation.id,
      currentCommonLocation.name,
    );
    loadCommonLocations();
    handleClose();
  };

  /**
   * Handles the click event when a commonlocation is clicked.
   * @param commonlocation - The commonlocation object that was clicked.
   */
  const handleClickOpen = (commonlocation: ICommonLocation) => {
    setCurrentCommonLocation(commonlocation);
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
   * Updates the current commonlocation's name in the state.
   * @param event - The change event object.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentCommonLocation({
      ...currentCommonLocation,
      name: event.target.value,
    });
  };

  return (
    <div>
      <h1>CommonLocations</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCommonLocation}
      >
        Add New CommonLocation
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>CommonLocations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commonlocations.map((commonlocation) => (
              <TableRow key={commonlocation.id}>
                <TableCell>{commonlocation.id}</TableCell>
                <TableCell>{commonlocation.name}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(commonlocation)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() =>
                      handleDeleteCommonLocation(commonlocation.id)
                    }
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
        <DialogTitle id="form-dialog-title">Update CommonLocation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the name of the commonlocation, please enter their new
            name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={currentCommonLocation.name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCommonLocation} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonLocationsComponent;
