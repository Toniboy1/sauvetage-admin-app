import Database from "../../../model/db";
import { IWeather } from "../../weathers/types";
import ItemsComponent from "../generic";
/**
 * CRUD component for the weather type.
 * @returns  The JSX element representing the Weather component.
 */
const WeatherComponent = () => {
  return (
    <ItemsComponent<IWeather>
      getAllItem={async () => await Database.getInstance().getAllWeathers()}
      addItem={async (name: string) =>
        await Database.getInstance().addWeather(name)
      }
      deleteItem={async (id: number) =>
        await Database.getInstance().deleteWeather(id)
      }
      updateItem={async (id: number, name: string) =>
        await Database.getInstance().updateWeather(id, name)
      }
      label="Conditions météorologiques"
      type="weather"
    />
  );
};
export default WeatherComponent;
