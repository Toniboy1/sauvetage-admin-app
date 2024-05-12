import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const AlarmedBySelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"alarmedBy"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllAlarms()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchAlarms(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addAlarm(name)}
      placeholder="Rechercher un type d'alarme"
      multiple={true}
      label="Alarmé par"
      required={required}
    />
  );
};
export default AlarmedBySelect;
