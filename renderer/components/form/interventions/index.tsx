import Database from "../../../model/db";
import { IInterventionType } from "../../interventions/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the alarm type.
 * @returns  The JSX element representing the Alarm component.
 */
const InterventionsTypeComponent = () => {
  return (
    <ItemsComponent<IInterventionType>
      getAllItem={async () =>
        await Database.getInstance().getAllInterventions()
      }
      addItem={async (name: string) =>
        await Database.getInstance().addIntervention(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteIntervention(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateIntervention(id, name)
      }
      label="Liste des types d'interventions"
      type="intervention"
    />
  );
};
export default InterventionsTypeComponent;
