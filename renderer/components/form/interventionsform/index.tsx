import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Database from "../../../model/db";
import Intervention from "../../generation/pdf/intervention";
import { IInterventionFormData } from "../../reports/intervention/types";
import { testAuth } from "../../../hooks/auth";

/**
 * Represents a component that displays a list of forminterventions and allows adding, editing, and deleting forminterventions.
 * @returns The JSX element representing the FormInterventions component.
 */
const FormInterventionsComponent = () => {
  const [forminterventions, setFormInterventions] = useState<
    IInterventionFormData[]
  >([]);

  useEffect(() => {
    loadFormInterventions();
  }, []);

  /**
   * Loads all forminterventions from the database and updates the state with the retrieved data.
   */
  const loadFormInterventions = async () => {
    const allFormInterventions =
      await Database.getInstance().getAllFormInterventions();
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
    await Database.getInstance().deleteFormIntervention(id);
    loadFormInterventions();
  };

  /**
   * redirect to the edit formintervention page
   * @param formintervention - The formintervention data.
   */
  function handleEdit(formintervention: IInterventionFormData): void {
    document.location.href = "/intervention/" + formintervention.id;
  }

  /**
   *  redirect to the view formintervention page
   * @param formintervention - The formintervention data.
   */
  async function handlPrint(
    formintervention: IInterventionFormData,
  ): Promise<void> {
    const doc = new jsPDF();
    const alarms = await Database.getInstance().getAllAlarms();
    const severities = await Database.getInstance().getAllSeverities();
    const interventionTypes =
      await Database.getInstance().getAllInterventions();
    const causes = await Database.getInstance().getAllCauses();
    const otherMeans = await Database.getInstance().getAllOtherMeans();
    const actionsTaken = await Database.getInstance().getAllActions();
    const commonLocations =
      await Database.getInstance().getAllCommonLocations();
    const weathers = await Database.getInstance().getAllWeathers();
    const winds = await Database.getInstance().getAllWinds();
    const lakeStates = await Database.getInstance().getAllLakeStates();
    Intervention(
      doc,
      formintervention,
      alarms,
      severities,
      interventionTypes,
      causes,
      otherMeans,
      actionsTaken,
      commonLocations,
      weathers,
      lakeStates,
      winds,
    );
    doc.save("rapport-intervention.pdf");
  }
  const { session, status } = testAuth();;
  return (
    <div>
      <h1>Liste des rapports d'interventions</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddFormIntervention}
      >
        Ajouter un nouveau rapport d'intervention
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
              {status != "authenticated" && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {forminterventions.map((formintervention) => {
              return (
                <TableRow key={formintervention.id}>
                  <TableCell>{formintervention.id}</TableCell>
                  <TableCell>
                    {formintervention.startedAt
                      .tz("Europe/Zurich")
                      .format("HH:mm")}
                  </TableCell>
                  <TableCell>
                    {formintervention.endedAt
                      .tz("Europe/Zurich")
                      .format("HH:mm")}
                  </TableCell>
                  <TableCell>
                    {formintervention.date
                      .tz("Europe/Zurich")
                      .format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>
                    {formintervention.pilote.map((p) => p.name).join(", ")}
                  </TableCell>
                  <TableCell>
                    {formintervention.crew.map((p) => p.name).join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handlPrint(formintervention)}
                    >
                      Imprimer
                    </Button>
                    {status == "authenticated" && <><Button
                      color="primary"
                      onClick={() => handleEdit(formintervention)}
                    >
                      Modifier
                    </Button>
                      <Button
                        color="error"
                        onClick={() =>
                          handleDeleteFormIntervention(formintervention.id)
                        }
                      >
                        Supprimer
                      </Button></>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormInterventionsComponent;
