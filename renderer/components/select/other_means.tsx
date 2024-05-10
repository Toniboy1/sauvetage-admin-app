import Select from "./generic";
import Database from "../../model/db";
import { IPropsSelectGereric } from "./types";
const OtherMeansSelect = ({
  allowCreate = false,
  required,
}: IPropsSelectGereric) => {
  return (
    <Select
      formField={"otherMeans"}
      allowCreate={allowCreate}
      getAllOptions={async () => await Database.getInstance().getAllOtherMeans()} // Ensure proper method binding
      searchOptions={async (searchTerm) =>
        await Database.getInstance().searchOtherMeans(searchTerm)
      }
      addOption={async (name) => await Database.getInstance().addOtherMean(name)}
      placeholder="Rechercher un autre moyen"
      multiple={true}
      label="Autres moyens"
      required={required}
    />
  );
};
export default OtherMeansSelect;
