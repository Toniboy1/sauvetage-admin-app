import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import { TEXT_FONT } from "./constants";

const rescued = (
  doc: jsPDF,
  form: IInterventionFormData,
  startingY: number,
): number => {
  TEXT_FONT(doc);
  doc.text(`Nombre de personne assistées: ${form.rescued}`, 20, startingY + 10);
  doc.text(
    `Nombre de personnes médicalisées: ${form.medicalized}`,
    20,
    startingY + 20,
  );
  doc.text(
    `Nombre de oersonne décédées: ${form.deceased}`,
    100,
    startingY + 10,
  );
  doc.text(
    `Immatriculation du bateau: ${form.boatRegistration}`,
    100,
    startingY + 20,
  );
  return startingY + 20;
};

export default rescued;
