import Database from "../../model/db";
import Select from "./generic";
import { IPropsSelectGereric } from "./types";
const Winds = ({
  allowCreate = false,
  required = false,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"winds"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllWinds()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchWinds(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addWind(name)}
      placeholder="Séléctionner la temps"
      multiple={true}
      label="Temps"
      required={required}
    />
  );
};
export default Winds;
