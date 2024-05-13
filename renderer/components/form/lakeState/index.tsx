import Database from "../../../model/db";
import { ILakeState } from "../../lakeStates/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the lakestate type.
 * @returns  The JSX element representing the LakeState component.
 */
const LakeStateComponent = () => {
  return (
    <ItemsComponent<ILakeState>
      getAllItem={async () => await Database.getInstance().getAllLakeStates()}
      addItem={async (name: string) =>
        await Database.getInstance().addLakeState(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteLakeState(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateLakeState(id, name)
      }
      label="Conditions du lac"
      type="lakestate"
    />
  );
};
export default LakeStateComponent;
