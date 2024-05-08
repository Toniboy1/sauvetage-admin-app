import React, { ChangeEvent, useEffect, useState } from "react";
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
import { ItemsComponentProps } from "./types";

const ItemsComponent = <T extends {
    name: string; id?: number;
},>({ getAllItem, addItem, deleteItem, updateItem,label }: ItemsComponentProps<T>) => {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<T>({
        id: 0,
        name: "",
    } as T);

    /**
     * Loads all items from the database and updates the state with the retrieved data.
     */
    const loadItems = async () => {
        const allItems = await getAllItem();
        setItems(allItems);
    };

    useEffect(() => {
        loadItems();
      }, []);

    /**
     * Adds a new item to the database and reloads the list of items.
     */
    const handleAddItem = async () => {
        await addItem("Nouvel Element");
        loadItems();
    };

    /**
     * Deletes a item with the specified ID.
     * @param id - The ID of the item to delete.
     * @returns - A promise that resolves when the item is deleted.
     */
    const handleDeleteItem = async (id: number): Promise<void> => {
        await deleteItem(id);
        loadItems();
    };

    /**
     * Handles the update of a item.
     * Updates the item's name in the database, reloads the items list, and closes the form.
     */
    const handleUpdateItem = async () => {
        await updateItem(currentItem.id, currentItem.name);
        loadItems();
        handleClose();
    };

    /**
     * Handles the click event when a item is clicked.
     * @param item - The item object that was clicked.
     */
    const handleClickOpen = (item: T) => {
        setCurrentItem(item);
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
     * Updates the current item's name in the state.
     * @param event - The change event object.
     */
    const handleNameChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setCurrentItem({ ...currentItem, name: event.target.value });
    };

    return (
        <div>
            <h1>{label}</h1>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
                Add New Item
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
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleClickOpen(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleDeleteItem(item.id)}
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
                <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update the name of the item, please enter their new name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentItem.name}
                        onChange={handleNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateItem} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ItemsComponent;
