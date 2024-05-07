import Select from './generic';
import db from '../../model/db';
const SeveritySelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'severity'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllSeverities()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchSeverities(searchTerm)}
        addOption={async (name) => await db.addSeverity(name)}
         />)
}
export default SeveritySelect;