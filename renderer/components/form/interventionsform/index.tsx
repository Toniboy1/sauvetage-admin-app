import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
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
} from "@mui/material";
import { IInterventionFormData } from "../../reports/intervention/types";

/**
 * Represents a component that displays a list of forminterventions and allows adding, editing, and deleting forminterventions.
 * @returns The JSX element representing the FormInterventions component.
 */
const FormInterventionsComponent = () => {
  const [forminterventions, setFormInterventions] = useState<IInterventionFormData[]>([]);

  useEffect(() => {
    loadFormInterventions();
  }, []);

  /**
   * Loads all forminterventions from the database and updates the state with the retrieved data.
   */
  const loadFormInterventions = async () => {
    const allFormInterventions = await db.getAllFormInterventions();
    console.log(allFormInterventions);
    setFormInterventions(allFormInterventions);
  };

  /**
   * Adds a new formintervention to the database and reloads the list of forminterventions.
   */
  const handleAddFormIntervention = async () => {
    document.location.href = "/intervention";
  };

  /**
   * Deletes a formintervention with the specified ID.
   * @param id - The ID of the formintervention to delete.
   * @returns - A promise that resolves when the formintervention is deleted.
   */
  const handleDeleteFormIntervention = async (id: number): Promise<void> => {
    await db.deleteFormIntervention(id);
    loadFormInterventions();
  };


  /**
   * redirect to the edit formintervention page
   * @param formintervention - The formintervention data.
   */
  function handleEdit(formintervention: IInterventionFormData): void {
    throw new Error("Function not implemented.");
  }
  console.log(forminterventions);
  return (
    <div>
      <h1>FormInterventions</h1>
      <Button variant="contained" color="primary" onClick={handleAddFormIntervention}>
        Add New FormIntervention
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Début</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Pilote</TableCell>
              <TableCell>Equipage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forminterventions.map((formintervention) => {
              console.log(typeof formintervention.startedAt, formintervention.startedAt);
              console.log(typeof formintervention.endedAt, formintervention.endedAt);
              console.log(typeof formintervention.date, formintervention.date);
              return (
                <TableRow key={formintervention.id}>
                  <TableCell>{formintervention.id}</TableCell>
                  <TableCell>{formintervention.startedAt.tz("Europe/Zurich").format('HH:mm')}</TableCell>
                  <TableCell>{formintervention.endedAt.tz("Europe/Zurich").format('HH:mm')}</TableCell>
                  <TableCell>{formintervention.date.tz("Europe/Zurich").format('DD-MM-YYYY')}</TableCell>
                  <TableCell>{formintervention.pilote.map((p) => p.name).join(", ")}</TableCell>
                  <TableCell>{formintervention.crew.map((p) => p.name).join(", ")}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleEdit(formintervention)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDeleteFormIntervention(formintervention.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormInterventionsComponent;
