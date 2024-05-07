import Select from './generic';
import db from '../../model/db';
import { IPropsSelectGereric } from './types';
const ActionTakenSelect = ({allowCreate = false, required = false}: IPropsSelectGereric)=>{
    return (<Select 
        formField={'actionsTaken'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllActions()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchActions(searchTerm)}
        addOption={async (name) => await db.addAction(name)}
        placeholder="Rechercher une mesure"
        multiple={true}
        label='Mesures prises'
        required={required}

         />)
}
export default ActionTakenSelect;