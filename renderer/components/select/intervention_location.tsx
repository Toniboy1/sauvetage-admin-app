import Select from './generic';
import db from '../../model/db';
const InterventionLocationSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'interventionLocation'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllCommonLocations()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchCommonLocation(searchTerm)}
        addOption={async (name) => await db.addCommonLocation(name)}
         />)
}
export default InterventionLocationSelect;