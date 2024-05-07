import Select from './generic';
import db from '../../model/db';
const InterventionTypeSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'inteverntionType'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllInterventions()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchInterventions(searchTerm)}
        addOption={async (name) => await db.addIntervention(name)}
        placeholder="Rechercher un type d'intervention"
        multiple={true}
        label="Type d'intervention"
         />)
}
export default InterventionTypeSelect;