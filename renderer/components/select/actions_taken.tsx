import Select from './generic';
import db from '../../model/db';
const ActionTakenSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'actionsTaken'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllActions()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchActions(searchTerm)}
        addOption={async (name) => await db.addAction(name)}
        placeholder="Rechercher une mesure"
        multiple={true}
        label='Mesures prises'
         />)
}
export default ActionTakenSelect;