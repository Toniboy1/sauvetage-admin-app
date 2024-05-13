import React, { useRef } from 'react';
import { Button } from '@mui/material';
import {Database} from '../../model/db';

const DataManagement = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
   * @param event The event containing the file to import.
   */
  const handleImport = async (event) => {
    const file = event.target.files[0];
    try {
      // Assuming Database is a class that handles your database operations
      await Database.getInstance().importDatabase(file);
      window.location.reload(); // Consider providing user feedback instead of reloading
    } catch (error) {
      console.error("Import failed: ", error);
    }
  };

  /**
   * This function will trigger the hidden file input when the button is clicked.
   */
  const triggerFileInput = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  return (
    <>
      <Button 
      onClick={triggerFileInput}
      sx={{
        minWidth: 120, // Set a minimum width for consistency
        maxWidth: 160, // Maximum width after which text will be truncated
        my: 2, mx: 0.5, color: 'white', display: 'block',
        overflow: 'hidden',  // Hide overflowed text
        textOverflow: 'ellipsis',  // Add ellipsis to overflowed text
        whiteSpace: 'nowrap',  // Keep text on a single line
        '-webkit-app-region': 'no-drag'  // Ensure buttons are clickable
      }}>
        Importer
        <input type="file" hidden onChange={handleImport} ref={fileInputRef}/>
      </Button>
      <Button
        sx={{
          minWidth: 120, // Set a minimum width for consistency
          maxWidth: 160, // Maximum width after which text will be truncated
          my: 2, mx: 0.5, color: 'white', display: 'block',
          overflow: 'hidden',  // Hide overflowed text
          textOverflow: 'ellipsis',  // Add ellipsis to overflowed text
          whiteSpace: 'nowrap',  // Keep text on a single line
          '-webkit-app-region': 'no-drag'  // Ensure buttons are clickable
        }}
        onClick={handleExport}

      >
        Exporter
      </Button>
    </>
  );
};
export default DataManagement;
