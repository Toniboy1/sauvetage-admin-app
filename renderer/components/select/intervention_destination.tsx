import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const InterventionDestinationSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"interventionDestination"}
      allowCreate={allowCreate}
      getAllOptions={async () =>
        await Database.getInstance().getAllCommonLocations()
      } // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchCommonLocation(searchTerm)
      }
      addOption={async (name) =>
        await Database.getInstance().addCommonLocation(name)
      }
      multiple={false}
      placeholder="Rechercher une destination"
      label="Destination"
      required={required}
    />
  );
};
export default InterventionDestinationSelect;
