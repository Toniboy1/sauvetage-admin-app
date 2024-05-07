import Select from './generic';
import db from '../../model/db';
import { IPropsSelectGereric } from './types';
const PiloteSelect = ({allowCreate = false,required,multiple = true}:  IPropsSelectGereric)=>{
    return (<Select
        formField={'pilote'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllPeople()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchPeople(searchTerm)}
        addOption={async (name) => await db.addPerson(name)}
        placeholder="Rechercher un pilote"
        label="Pilote"
        required={required}
        multiple={multiple}
         />)
}
export default PiloteSelect;