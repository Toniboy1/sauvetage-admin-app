import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const CrewSelect = ({
  allowCreate = false,
  required = true,
  multiple = true,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"crew"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllPeople()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchPeople(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addPerson(name)}
      placeholder="Rechercher un membre d'équipage"
      multiple={multiple}
      label="Membre d'équipage"
      required={required}
    />
  );
};
export default CrewSelect;
export { CrewSelect };
