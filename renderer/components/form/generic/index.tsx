import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { ItemsComponentProps } from "./types";

/**
 * GENERIC CRUD component for the crm types
 * @param genereicProps The props for the generic component.
 * @param genereicProps.getAllItem The function to get all items.
 * @param genereicProps.addItem The function to add an item.
 * @param genereicProps.deleteItem The function to delete an item.
 * @param genereicProps.updateItem The function to update an item.
 * @param genereicProps.label The label for the component.
 * @param genereicProps.type The type of the component.
 * @returns  The JSX element representing the generic component.
 */
const ItemsComponent = <
  T extends {
    name: string;
    id?: number;
  },
>({
  getAllItem,
  addItem,
  deleteItem,
  updateItem,
  label,
  type,
}: ItemsComponentProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");

  /**
   * Loads all items from the database.
   */
  const loadItems = async () => {
    const allItems = await getAllItem();
    setItems(allItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  /**
   * Handles the addition of a new item.
   */
  const handleAddItem = async () => {
    await addItem("Nouvel Element");
    loadItems();
  };

  /**
   * Handles the deletion of an item.
   * @param id The id of the item to delete.
   */
  const handleDeleteItem = async (id: number) => {
    await deleteItem(id);
    loadItems();
  };

  /**
   * Starts the editing of an item.
   * @param item The item to edit.
   */
  const startEditing = (item: T) => {
    setEditItemId(item.id);
    setEditItemName(item.name);
  };

  /**
   * Stops the editing of an item.
   */
  const stopEditing = () => {
    setEditItemId(null);
    setEditItemName("");
  };

  /**
   * Handles the update of an item.
   */
  const handleUpdateItem = async () => {
    if (editItemId !== null) {
      await updateItem(editItemId, editItemName);
      loadItems();
      stopEditing();
    }
  };

  /**
   * Handles the key press event.
   * @param event The key press event.
   */
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleUpdateItem();
    }
  };

  /**
   * Handles the change of the name.
   * @param event The change event.
   */
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditItemName(event.target.value);
  };

  return (
    <div>
      <h1>{label}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        id={`add-${type}`}
      >
        Ajouter un nouvel élément
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {editItemId === item.id ? (
                    <TextField
                      value={editItemName}
                      onChange={handleNameChange}
                      onKeyPress={handleKeyPress}
                      autoFocus
                      size="small"
                      fullWidth
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell>
                  {editItemId === item.id ? (
                    <>
                      <Button color="primary" onClick={handleUpdateItem}>
                        Sauvegarder
                      </Button>
                      <Button color="error" onClick={stopEditing}>
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="primary"
                        onClick={() => startEditing(item)}
                      >
                        Modifier
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemsComponent;
