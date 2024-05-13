import Database from "../../model/db";
import Select from "./generic";
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
      getAllOptions={async () =>
        await Database.getInstance().getAllSeverities()
      } // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchSeverities(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addSeverity(name)}
      placeholder="Rechercher une sévérité"
      label="Sévérité"
      required={required}
      multiple={multiple}
    />
  );
};
export default SeveritySelect;
