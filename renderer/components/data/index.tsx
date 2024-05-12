import React from "react";
import { Button } from "@mui/material";
import Database from "../../model/db";
const DataManagement = () => {
  /**
   * Handles the export of the database.
   * Exports the database to a JSON file and downloads it.
   */
  const handleExport = async () => {
    try {
      const blob = await Database.getInstance().exportDatabase();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "database-export.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed: ", error);
    }
  };

  /**
   * Handles the import of a database file.
   * @param event  The event containing the file to import.
   */
  const handleImport = async (event) => {
    const file = event.target.files[0];
    try {
      await Database.getInstance().importDatabase(file);
      window.location.reload();
      console.log("Database import successful");
    } catch (error) {
      console.error("Import failed: ", error);
    }
  };

  return (
    <div>
      <Button variant="contained" component="label">
        Import Database
        <input type="file" hidden onChange={handleImport} />
      </Button>
      <Button
        variant="contained"
        onClick={handleExport}
        style={{ marginLeft: 8 }}
      >
        Export Database
      </Button>
    </div>
  );
};
export default DataManagement;
