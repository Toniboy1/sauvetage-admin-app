import ItemsComponent from "../generic";
import Database from "../../../model/db";
import { IOtherMean } from "../../otherMeans/types";
/**
 * CRUD component for the other means type.
 * @returns  The JSX element representing the Other means component.
 */
const OtherMeansComponent = () => {
  return (
    <ItemsComponent<IOtherMean>
      getAllItem={async () => await Database.getInstance().getAllOtherMeans()}
      addItem={async (name: string) =>
        await Database.getInstance().addOtherMean(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteOtherMean(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateOtherMean(id, name)
      }
      label="Type d'alarmes"
      type="other-mean"
    />
  );
};
export default OtherMeansComponent;
