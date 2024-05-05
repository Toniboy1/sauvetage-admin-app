import React, { ChangeEvent, useEffect, useState } from 'react';
import db from '../../../model/db';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { IPeople } from '../../people/types';

/**
 * Represents a component that displays a list of people and allows adding, editing, and deleting people.
 */
const PeopleComponent = ()=> {
    const [people, setPeople] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<IPeople>({ id: 0, name: ""});

    useEffect(() => {
        loadPeople();
    }, []);

    /**
     * Loads all people from the database and updates the state with the retrieved data.
     */
    const loadPeople = async () => {
        const allPeople = await db.getAllPeople();
        setPeople(allPeople);
    };

    /**
     * Adds a new person to the database and reloads the list of people.
     */
    const handleAddPerson = async () => {
        await db.addPerson("New Person");
        loadPeople();
    };

    /**
     * Deletes a person with the specified ID.
     * @param {number} id - The ID of the person to delete.
     * @returns {Promise<void>} - A promise that resolves when the person is deleted.
     */
    const handleDeletePerson = async (id: number): Promise<void> => {
        await db.deletePerson(id);
        loadPeople();
    };

    /**
     * Handles the update of a person.
     * Updates the person's name in the database, reloads the people list, and closes the form.
     */
    const handleUpdatePerson = async () => {
        await db.updatePerson(currentPerson.id, currentPerson.name);
        loadPeople();
        handleClose();
    };

    /**
     * Handles the click event when a person is clicked.
     * 
     * @param person - The person object that was clicked.
     */
    const handleClickOpen = (person: IPeople) => {
        setCurrentPerson(person);
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
     * Updates the current person's name in the state.
     * 
     * @param event - The change event object.
     */
    const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentPerson({ ...currentPerson, name: event.target.value });
    };

    return (
        <div>
            <h1>People</h1>
            <Button variant="contained" color="primary" onClick={handleAddPerson}>Add New Person</Button>
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
                        {people.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.id}</TableCell>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleClickOpen(person)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDeletePerson(person.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Person</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update the name of the person, please enter their new name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentPerson.name}
                        onChange={handleNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdatePerson} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PeopleComponent;
