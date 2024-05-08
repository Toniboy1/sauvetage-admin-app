import ItemsComponent from '../generic';
import db from '../../../model/db';
import { IInterventionType } from '../../interventions/types';
/**
 * CRUD component for the alarm type.
 * @returns  The JSX element representing the Alarm component.
 */
const InterventionsTypeComponent = () => {
  return (
    <ItemsComponent<IInterventionType>
      getAllItem={async() => await db.getAllInterventions()}
      addItem={async (name: string) => await db.addIntervention(name)}
      deleteItem={async (id:number)=>await db.deleteIntervention(id)}
      updateItem={async (id:number,name:string)=>await db.updateIntervention(id,name)  }
      label="Type d'interventions"
    />
  );
}
export default InterventionsTypeComponent;