import Database from "../../model/db";
import Select from "./generic";
import { IPropsSelectGereric } from "./types";
const LakeStates = ({
  allowCreate = false,
  required = false,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"lakeStates"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllLakeStates()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchLakeStates(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addLakeState(name)}
      placeholder="Séléctionner la temps"
      multiple={true}
      label="Temps"
      required={required}
    />
  );
};
export default LakeStates;
