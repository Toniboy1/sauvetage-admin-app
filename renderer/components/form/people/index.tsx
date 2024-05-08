import ItemsComponent from '../generic';
import db from '../../../model/db';
import { IPeople } from '../../people/types';
/**
 * CRUD component for the person type.
 * @returns  The JSX element representing the Person component.
 */
const PersonComponent = () => {
  return (
    <ItemsComponent<IPeople>
      getAllItem={async() => await db.getAllPeople()}
      addItem={async (name: string) => await db.addPerson(name)}
      deleteItem={async (id:number)=>await db.deletePerson(id)}
      updateItem={async (id:number,name:string)=>await db.updatePerson(id,name)  }
      label="Type d'persones"
    />
  );
}
export default PersonComponent;