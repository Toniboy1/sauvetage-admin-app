import ItemsComponent from "../generic";
import db from "../../../model/db";
import { IAlarm } from "../../alarm/types";
/**
 * CRUD component for the alarm type.
 * @returns  The JSX element representing the Alarm component.
 */
const AlarmComponent = () => {
  return (
    <ItemsComponent<IAlarm>
      getAllItem={async () => await db.getAllAlarms()}
      addItem={async (name: string) => await db.addAlarm(name)}
      deleteItem={async (id: number) => await db.deleteAlarm(id)}
      updateItem={async (id: number, name: string) =>
        await db.updateAlarm(id, name)
      }
      label="Type d'alarmes"
    />
  );
};
export default AlarmComponent;
