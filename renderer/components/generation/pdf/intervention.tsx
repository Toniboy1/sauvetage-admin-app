import jsPDF from "jspdf";
import header from "./header";
import time from "./time";
import crew from "./crew";
import { IInterventionFormData } from "../../reports/intervention/types";
import setupFonts from "./fonts";

const Intervention = (doc :jsPDF, form: IInterventionFormData) => {
    setupFonts(doc);
    header(doc);
    time(doc,form);
    crew(doc,form);
}
export default Intervention;