import ItemsComponent from "../generic";
import Database from "../../../model/db";
import { ICause } from "../../causes/types";
/**
 * CRUD component for the cause type.
 * @returns  The JSX element representing the Cause component.
 */
const CauseComponent = () => {
  return (
    <ItemsComponent<ICause>
      getAllItem={async () => await Database.getInstance().getAllCauses()}
      addItem={async (name: string) =>
        await Database.getInstance().addCause(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteCause(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateCause(id, name)
      }
      type="cause"
      label="Liste des causes d'interventions"
    />
  );
};
export default CauseComponent;
