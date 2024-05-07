import Select from './generic';
import db from '../../model/db';
const PiloteSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'pilote'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllPeople()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchPeople(searchTerm)}
        addOption={async (name) => await db.addPerson(name)}
        placeholder="Rechercher un pilote"
        multiple={false}
        label="Pilote"
         />)
}
export default PiloteSelect;