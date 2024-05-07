import Select from './generic';
import db from '../../model/db';
const CrewSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'crew'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllPeople()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchPeople(searchTerm)}
        addOption={async (name) => await db.addPerson(name)}
         />)
}
export default CrewSelect;