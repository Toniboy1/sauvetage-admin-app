import Select from "./generic";
import db from "../../model/db";
import { IPropsSelectGereric } from "./types";
const CauseSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"causes"}
      allowCreate={allowCreate}
      getAllOptions={async () => await db.getAllCauses()} // Ensure proper method binding
      searchOptions={async (searchTerm) => await db.searchCause(searchTerm)}
      addOption={async (name) => await db.addCause(name)}
      placeholder="Rechercher une cause"
      multiple={true}
      label="Causes"
      required={required}
    />
  );
};
export default CauseSelect;
