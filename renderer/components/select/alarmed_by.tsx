import Select from "./generic";
import db from "../../model/db";
import { IPropsSelectGereric } from "./types";
const AlarmedBySelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"alarmedBy"}
      allowCreate={allowCreate}
      getAllOptions={async () => await db.getAllAlarms()} // Ensure proper method binding
      searchOptions={async (searchTerm) => await db.searchAlarms(searchTerm)}
      addOption={async (name) => await db.addAlarm(name)}
      placeholder="Rechercher un type d'alarme"
      multiple={true}
      label="Alarmé par"
      required={required}
    />
  );
};
export default AlarmedBySelect;
