import Select from './generic';
import db from '../../model/db';
import { IPropsSelectGereric } from './types';
const CrewSelect = ({allowCreate = false,required =true,multiple=true}:  IPropsSelectGereric)=>{
    return (<Select 
        formField={'crew'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllPeople()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchPeople(searchTerm)}
        addOption={async (name) => await db.addPerson(name)}
        placeholder="Rechercher un membre d'équipage"
        multiple={multiple}
        label="Membre d'équipage"
        required={required}
         />)
}
export default CrewSelect;