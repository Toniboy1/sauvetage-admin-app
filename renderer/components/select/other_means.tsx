import Select from './generic';
import db from '../../model/db';
const OtherMeansSelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'otherMeans'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllOtherMeans()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchOtherMeans(searchTerm)}
        addOption={async (name) => await db.addOtherMean(name)}
         />)
}
export default OtherMeansSelect;