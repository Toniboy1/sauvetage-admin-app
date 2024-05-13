import Database from "../../model/db";
import Select from "./generic";
import { IPropsSelectGereric } from "./types";
const Weathers = ({
  allowCreate = false,
  required = false,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"weathers"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllWeathers()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchWeathers(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addWeather(name)}
      placeholder="Séléctionner la temps"
      multiple={true}
      label="Temps"
      required={required}
    />
  );
};
export default Weathers;
