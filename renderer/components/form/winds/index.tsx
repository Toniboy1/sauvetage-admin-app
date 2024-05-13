import Database from "../../../model/db";
import { IWind } from "../../winds/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the wind type.
 * @returns  The JSX element representing the Wind component.
 */
const WindComponent = () => {
  return (
    <ItemsComponent<IWind>
      getAllItem={async () => await Database.getInstance().getAllWinds()}
      addItem={async (name: string) =>
        await Database.getInstance().addWind(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteWind(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateWind(id, name)
      }
      label="Conditions du vent"
      type="wind"
    />
  );
};
export default WindComponent;
