import Select from './generic';
import db from '../../model/db';
import { IPropsSelectGereric } from './types';
const InterventionLocationSelect = ({allowCreate = false,required}:  IPropsSelectGereric)=>{
    return (<Select 
        formField={'interventionLocation'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllCommonLocations()}
        searchOptions={async (searchTerm) => await db.searchCommonLocation(searchTerm)}
        addOption={async (name) => await db.addCommonLocation(name)}
        multiple={false}
        placeholder="Rechercher un lieu d'intervention"
        label="Lieu d'intervention"
        required={required}
         />)
}
export default InterventionLocationSelect;