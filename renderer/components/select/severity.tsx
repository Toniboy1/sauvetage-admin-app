import Select from "./generic";
import db from "../../model/db";
import { IPropsSelectGereric } from "./types";
const SeveritySelect = ({
  allowCreate = false,
  required,
  multiple = false,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"severity"}
      allowCreate={allowCreate}
      getAllOptions={async () => await db.getAllSeverities()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await db.searchSeverities(searchTerm)
      }
      addOption={async (name) => await db.addSeverity(name)}
      placeholder="Rechercher une sévérité"
      label="Sévérité"
      required={required}
      multiple={multiple}
    />
  );
};
export default SeveritySelect;
