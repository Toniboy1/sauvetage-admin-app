import Select from './generic';
import db from '../../model/db';
const CauseSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'causes'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllCauses()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchCause(searchTerm)}
        addOption={async (name) => await db.addCause(name)}
        placeholder="Rechercher une cause"
        multiple={true}
        label='Causes'
         />)
}
export default CauseSelect;