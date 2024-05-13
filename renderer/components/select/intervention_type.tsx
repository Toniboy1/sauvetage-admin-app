import Database from "../../model/db";
import Select from "./generic";
import { IPropsSelectGereric } from "./types";
const InterventionTypeSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"inteverntionType"}
      allowCreate={allowCreate}
      getAllOptions={async () =>
        await Database.getInstance().getAllInterventions()
      } // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchInterventions(searchTerm)
      }
      addOption={async (name) =>
        await Database.getInstance().addIntervention(name)
      }
      placeholder="Rechercher un type d'intervention"
      multiple={true}
      label="Type d'intervention"
      required={required}
    />
  );
};
export default InterventionTypeSelect;
