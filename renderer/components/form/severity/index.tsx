import ItemsComponent from '../generic';
import db from '../../../model/db';
import { ISeverity } from '../../severities/types';
/**
 * CRUD component for the severity type.
 * @returns  The JSX element representing the Severity component.
 */
const SeverityComponent = () => {
  return (
    <ItemsComponent<ISeverity>
      getAllItem={async() => await db.getAllSeverities()}
      addItem={async (name: string) => await db.addSeverity(name)}
      deleteItem={async (id:number)=>await db.deleteSeverity(id)}
      updateItem={async (id:number,name:string)=>await db.updateSeverity(id,name)  }
      label="Type de sévérité"
    />
  );
}
export default SeverityComponent;