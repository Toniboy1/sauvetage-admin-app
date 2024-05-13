import { Print } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IInterventionFormData } from "../../../components/reports/intervention/types";
import Database from "../../../model/db";

const EditIntervention = () => {
  const router = useRouter();
  const { id } = router.query;
  const formId = parseInt(id as string);
  const [form, setForm] = useState<IInterventionFormData>();

  useEffect(() => {
    if (id) {
      Database.getInstance()
        .getFormIntervention(formId)
        .then(setForm)
        .catch(console.error);
    }
  }, [id]);

  if (!form) {
    return <div>Loading...</div>;
  }
  const generatePDF = () => {};
  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={generatePDF}>
        <Print />
      </Fab>
    </div>
  );
};

export default EditIntervention;
