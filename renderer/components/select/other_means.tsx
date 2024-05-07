import Select from './generic';
import db from '../../model/db';
import { IPropsSelectGereric } from './types';
const OtherMeansSelect = ({allowCreate = false,required}:  IPropsSelectGereric)=>{
    return (<Select 
        formField={'otherMeans'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllOtherMeans()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchOtherMeans(searchTerm)}
        addOption={async (name) => await db.addOtherMean(name)}
        placeholder="Rechercher un autre moyen"
        multiple={true}
        label="Autres moyens"
        required={required}
         />)
}
export default OtherMeansSelect;