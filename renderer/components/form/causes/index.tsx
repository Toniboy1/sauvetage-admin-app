import ItemsComponent from '../generic';
import db from '../../../model/db';
import { ICause } from '../../causes/types';
/**
 * CRUD component for the cause type.
 * @returns  The JSX element representing the Cause component.
 */
const CauseComponent = () => {
  return (
    <ItemsComponent<ICause>
      getAllItem={async() => await db.getAllCauses()}
      addItem={async (name: string) => await db.addCause(name)}
      deleteItem={async (id:number)=>await db.deleteCause(id)}
      updateItem={async (id:number,name:string)=>await db.updateCause(id,name)  }
      label="Cause des interventions"
    />
  );
}
export default CauseComponent;