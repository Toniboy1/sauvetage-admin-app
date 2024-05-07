import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import db from "../../../model/db";
import { IInterventionFormData } from "../../../components/reports/intervention/types";
import { Fab, Stack } from "@mui/material";
import { Print } from "@mui/icons-material";
import jsPDF from "jspdf";

const TEXT_FONT = (doc: jsPDF) => {
  doc.setTextColor(0, 0, 0);
  doc.setFont("calibri");
};
const SUBTITLE_FONT = (doc: jsPDF) => {
  doc.setFontSize(25);
  doc.setFont("calibri-light");
};
const TITLE = (doc: jsPDF) => {
  doc.setFontSize(15);
  doc.setFont("calibri-bold");
  doc.setTextColor(0, 0, 255);
};
const HEADER_TITLE = (doc: jsPDF) => {
  doc.setFontSize(28);
  doc.setFont("calibri-light");
  doc.setTextColor(0, 0, 0);
};
const EditIntervention = () => {
  const router = useRouter();
  const { id } = router.query;
  const formId = parseInt(id as string);
  const [form, setForm] = useState<IInterventionFormData>();
  const timeComponent = (doc: jsPDF) => {
    TEXT_FONT(doc);
    doc.setFontSize(12);
    doc.text(`Date: ${form.date.format("DD-MM-YYYY")}`, 20, 50);
    doc.text(`Heure alarme: ${form.startedAt.format("HH:mm")}`, 90, 50);
    doc.text(`Heure de fin: ${form.endedAt.format("HH:mm")}`, 90, 60);
  };
  const headerComponent = (doc: jsPDF) => {
    HEADER_TITLE(doc);
    doc.text("SISL-SECTION VILLENEUVE", 105, 20, { align: "center" });
    SUBTITLE_FONT(doc);
    doc.text("Rapport d'intervention", 105, 30, { align: "center" });
    TEXT_FONT(doc);
  };
  const crewComponent = (doc: jsPDF) => {
    TITLE(doc);
    doc.text("Équipage:", 20, 90);
    TEXT_FONT(doc);
    doc.text(`Pilote: ${form.pilote.map((p) => p.name).join(", ")}`, 20, 100);
    form.crew.forEach((p, index) => {
      doc.text(`Equipier ${index + 1}: ${p.name}`, 20, 110 + index * 10);
    });
  };
  useEffect(() => {
    if (id) {
      db.getFormIntervention(formId).then(setForm).catch(console.error);
    }
  }, [id]);

  if (!form) {
    return <div>Loading...</div>;
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addFont("calibri", "calibri", "normal");
    doc.addFont("calibri-bold", "calibri", "bold");
    doc.addFont("calibri-light", "calibri", "light");
    doc.addFont("calibri-italic", "calibri", "italic");
    headerComponent(doc);
    timeComponent(doc);
    crewComponent(doc);
    doc.save("rapport-intervention.pdf");
  };
  return (
    <div>
      <div id="generated-report">
        {/* Inline CSS for printing the A4 page */}
        <style>
          {`
                @media print {
                    body {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        margin: 0;
                    }
                    .a4-page {
                        width: 210mm;
                        min-height: 297mm;
                        margin: 0 auto;
                        box-shadow: none;
                        page-break-after: always;
                        page-break-inside: avoid;
                    }
                }
                `}
        </style>
        <div className="print-container" style={{ textAlign: "center" }}>
          <div className="a4-page">
            <h1>SISL-SECTION VILLENEUVE</h1>
            <h2>Rapport d'intervention</h2>
            <Stack direction="row" alignContent="center" spacing={2}>
              <div>
                Date: <span>{form.date.format("DD-MM-YYYY")}</span>
              </div>
              <Stack direction="column" spacing={2}>
                <div>
                  Heure alarme: <span>{form.startedAt.format("HH:mm")}</span>
                </div>
                <div>
                  Heure de fin: <span>{form.endedAt.format("HH:mm")}</span>
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <h2>Équipage :</h2>
              <Stack direction="column" spacing={2}>
                <div>
                  Pilote:{" "}
                  <span>{form.pilote.map((p) => p.name).join(", ")}</span>
                </div>
                <div>
                  Equipiers:{" "}
                  <span>{form.crew.map((p) => p.name).join(", ")}</span>
                </div>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
      <Fab color="primary" aria-label="add" onClick={generatePDF}>
        <Print />
      </Fab>
    </div>
  );
};

export default EditIntervention;
