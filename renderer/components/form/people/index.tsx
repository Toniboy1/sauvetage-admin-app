import ItemsComponent from "../generic";
import Database from "../../../model/db";
import { IPeople } from "../../people/types";
/**
 * CRUD component for the person type.
 * @returns  The JSX element representing the Person component.
 */
const PersonComponent = () => {
  return (
    <ItemsComponent<IPeople>
      getAllItem={async () => await Database.getInstance().getAllPeople()}
      addItem={async (name: string) => await Database.getInstance().addPerson(name)}
      deleteItem={async (id: number) => await Database.getInstance().deletePerson(id)}
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updatePerson(id, name)
      }
      label="Type d'persones"
    />
  );
};
export default PersonComponent;
