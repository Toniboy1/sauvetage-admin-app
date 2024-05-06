import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import db from "../../model/db";
import { ISeverity } from "./types";

const Severity = () => {
    const [selectedSeverityId, setSelectedSeverityId] = useState<number | null>(null);
    const [severity, setSeverity] = useState<ISeverity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSeverity = async () => {
        try {
            const allSeverity = await db.getAllSeverities();
            setSeverity(allSeverity);
        } catch (error) {
            setError(error as Error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSeverity();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSeverityId(Number(event.target.value));
    };

    return (
        <RadioGroup value={selectedSeverityId} onChange={handleRadioChange}>
            <Grid container spacing={2}>
                {severity.map((severity) => (
                    <Grid item xs={6} key={severity.id}>
                        <FormControlLabel
                            control={<Radio />}
                            label={severity.name}
                            value={severity.id}
                        />
                    </Grid>
                ))}
            </Grid>
        </RadioGroup>
    );
}

export default Severity;
