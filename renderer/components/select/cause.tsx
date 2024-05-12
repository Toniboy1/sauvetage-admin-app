import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const CauseSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"causes"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllCauses()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchCause(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addCause(name)}
      placeholder="Rechercher une cause"
      multiple={true}
      label="Causes"
      required={required}
    />
  );
};
export default CauseSelect;
