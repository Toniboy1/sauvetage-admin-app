import Database from "../../../model/db";
import { ICommonLocation } from "../../location/commons/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the Common locations type.
 * @returns  The JSX element representing the common locations component.
 */
const CommonLoacationComponent = () => {
  return (
    <ItemsComponent<ICommonLocation>
      getAllItem={async () =>
        await Database.getInstance().getAllCommonLocations()
      }
      addItem={async (name: string) =>
        await Database.getInstance().addCommonLocation(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteCommonLocation(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateCommonLocation(id, name)
      }
      label="Liste des lieux fréquents"
      type="common-location"
    />
  );
};
export default CommonLoacationComponent;
