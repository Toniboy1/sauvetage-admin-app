import Select from './generic';
import db from '../../model/db';
const AlarmedBySelect = ({allowCreate = false}: {allowCreate:boolean})=>{
    return (<Select 
        formField={'alarmedBy'} 
        allowCreate={allowCreate} 
        getAllOptions={async () =>  await db.getAllAlarms()} // Ensure proper method binding
        searchOptions={async (searchTerm) => await db.searchAlarms(searchTerm)}
        addOption={async (name) => await db.addAlarm(name)}
        placeholder="Rechercher un type d'alarme"
        multiple={true}
        label='Alarmé par'
         />)
}
export default AlarmedBySelect;