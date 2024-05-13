import Database from "../../../model/db";
import { ISeverity } from "../../severities/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the severity type.
 * @returns  The JSX element representing the Severity component.
 */
const SeverityComponent = () => {
  return (
    <ItemsComponent<ISeverity>
      getAllItem={async () => await Database.getInstance().getAllSeverities()}
      addItem={async (name: string) =>
        await Database.getInstance().addSeverity(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteSeverity(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateSeverity(id, name)
      }
      label="Type de gravité"
      type="severity"
    />
  );
};
export default SeverityComponent;
