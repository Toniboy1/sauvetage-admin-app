import Database from "../../../model/db";
import { IAlarm } from "../../alarm/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the alarm type.
 * @returns  The JSX element representing the Alarm component.
 */
const AlarmComponent = () => {
  return (
    <ItemsComponent<IAlarm>
      getAllItem={async () => await Database.getInstance().getAllAlarms()}
      addItem={async (name: string) =>
        await Database.getInstance().addAlarm(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteAlarm(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateAlarm(id, name)
      }
      label="Type d'alarmes"
      type="alarm"
    />
  );
};
export default AlarmComponent;
