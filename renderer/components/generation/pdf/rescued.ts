import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import { INTERLINE_COMPONENT_LOOP, PADDING_BOTTOM, TEXT_FONT, TITLE_SPACING } from "./constants";

const rescued = (
  doc: jsPDF,
  form: IInterventionFormData,
  startingY: number,
): number => {
  TEXT_FONT(doc);
  doc.text(`Nombre de personne assistées: ${form.rescued}`, 20, startingY + TITLE_SPACING);
  doc.text(
    `Nombre de personnes médicalisées: ${form.medicalized}`,
    20,
    startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
  );
  doc.text(
    `Nombre de oersonne décédées: ${form.deceased}`,
    100,
    startingY + TITLE_SPACING,
  );
  doc.text(
    `Immatriculation du bateau: ${form.boatRegistration}`,
    100,
    startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
  );
  return  startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP + PADDING_BOTTOM;
};

export default rescued;
