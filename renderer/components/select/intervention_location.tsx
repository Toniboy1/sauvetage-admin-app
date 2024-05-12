import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const InterventionLocationSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"interventionLocation"}
      allowCreate={allowCreate}
      getAllOptions={async () =>
        await Database.getInstance().getAllCommonLocations()
      }
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchCommonLocation(searchTerm)
      }
      addOption={async (name) =>
        await Database.getInstance().addCommonLocation(name)
      }
      multiple={false}
      placeholder="Rechercher un lieu d'intervention"
      label="Lieu d'intervention"
      required={required}
    />
  );
};
export default InterventionLocationSelect;
