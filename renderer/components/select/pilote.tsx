import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const PiloteSelect = ({
  allowCreate = false,
  required,
  multiple = true,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"pilote"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllPeople()} // Ensure proper method binding
      searchOptions={async (searchTerm) => await Database.getInstance().searchPeople(searchTerm)}
      addOption={async (name) => await Database.getInstance().addPerson(name)}
      placeholder="Rechercher un pilote"
      label="Pilote"
      required={required}
      multiple={multiple}
    />
  );
};
export default PiloteSelect;
