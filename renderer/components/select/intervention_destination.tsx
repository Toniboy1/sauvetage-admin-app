import Select from "./generic";
import db from "../../model/db";
import { IPropsSelectGereric } from "./types";
const InterventionDestinationSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"interventionDestination"}
      allowCreate={allowCreate}
      getAllOptions={async () => await db.getAllCommonLocations()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await db.searchCommonLocation(searchTerm)
      }
      addOption={async (name) => await db.addCommonLocation(name)}
      multiple={false}
      placeholder="Rechercher une destination"
      label="Destination"
      required={required}
    />
  );
};
export default InterventionDestinationSelect;
