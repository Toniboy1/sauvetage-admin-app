import Database from "../../../model/db";
import { IAction } from "../../actions/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the action type.
 * @returns  The JSX element representing the Action component.
 */
const ActionComponent = () => {
  return (
    <ItemsComponent<IAction>
      getAllItem={async () => await Database.getInstance().getAllActions()}
      addItem={async (name: string) =>
        await Database.getInstance().addAction(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteAction(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateAction(id, name)
      }
      label="Liste des type d'actions"
      type="action"
    />
  );
};
export default ActionComponent;
