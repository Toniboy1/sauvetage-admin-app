import ItemsComponent from "../generic";
import db from "../../../model/db";
import { IOtherMean } from "../../otherMeans/types";
/**
 * CRUD component for the other means type.
 * @returns  The JSX element representing the Other means component.
 */
const OtherMeansComponent = () => {
  return (
    <ItemsComponent<IOtherMean>
      getAllItem={async () => await db.getAllOtherMeans()}
      addItem={async (name: string) => await db.addOtherMean(name)}
      deleteItem={async (id: number) => await db.deleteOtherMean(id)}
      updateItem={async (id: number, name: string) =>
        await db.updateOtherMean(id, name)
      }
      label="Type d'alarmes"
    />
  );
};
export default OtherMeansComponent;
