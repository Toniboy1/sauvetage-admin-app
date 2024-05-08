import Select from "./generic";
import db from "../../model/db";
import { IPropsSelectGereric } from "./types";
const InterventionTypeSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"inteverntionType"}
      allowCreate={allowCreate}
      getAllOptions={async () => await db.getAllInterventions()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await db.searchInterventions(searchTerm)
      }
      addOption={async (name) => await db.addIntervention(name)}
      placeholder="Rechercher un type d'intervention"
      multiple={true}
      label="Type d'intervention"
      required={required}
    />
  );
};
export default InterventionTypeSelect;
