import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField"; // Import TextField from MUI
import { IInterventionFormData } from "../reports/intervention/types";
import { FormControl } from "@mui/material";

/**
 * Remark component
 * @returns JSX.Element
 */
const Remark = (): JSX.Element => {
  const { control } = useFormContext<IInterventionFormData>(); // Using react-hook-form's useFormContext

  return (
    <Controller
      name="remark"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            {...field}
            id="outlined-multiline-static"
            label="Remarques"
            multiline
            rows={4}
            variant="outlined"
          />
        </FormControl>
      )}
    />
  );
};

export default Remark;
