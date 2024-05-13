import Database from "../../model/db";
import Select from "./generic";
import { IPropsSelectGereric } from "./types";
const ActionTakenSelect = ({
  allowCreate = false,
  required = false,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"actionsTaken"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllActions()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchActions(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addAction(name)}
      placeholder="Rechercher une mesure"
      multiple={true}
      label="Mesures prises"
      required={required}
    />
  );
};
export default ActionTakenSelect;
