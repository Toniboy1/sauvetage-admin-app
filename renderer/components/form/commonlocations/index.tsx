import ItemsComponent from '../generic';
import db from '../../../model/db';
import { ICommonLocation } from '../../location/commons/types';
/**
 * CRUD component for the Common locations type.
 * @returns  The JSX element representing the common locations component.
 */
const CommonLoacationComponent = () => {
  return (
    <ItemsComponent<ICommonLocation>
      getAllItem={async() => await db.getAllCommonLocations()}
      addItem={async (name: string) => await db.addCommonLocation(name)}
      deleteItem={async (id:number)=>await db.deleteCommonLocation(id)}
      updateItem={async (id:number,name:string)=>await db.updateCommonLocation(id,name)  }
      label="Lieux Fréquents"
    />
  );
}
export default CommonLoacationComponent;